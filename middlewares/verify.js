const tokenService = require('../helpers/jwt')
const adminModel = require('../models/employee')
const responseService = require("../helpers/response")
const mongoose = require('mongoose')

// module.exports = (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(" ")[1];


//    const abc = jwt.verify(token, process.env.Token_secret, (err, user) => {
//       if (err) {
//         return res.sendStatus(403);
//       }

//       req.user = user;

//       next();
//     });


//   } catch (err) {
//     console.log(err);
//   }
// };

module.exports = async (req, res, next) => {
  try {
    if (!req?.headers?.authorization) {
      return responseService.returnToResponse(res, {}, 401, '', 'Unauthorised')
    }
    const token = req.headers.authorization.split(" ")[1];
    const userDetails = await tokenService.decodeJWTToken(token);
    const adminUserDetails = await adminModel.aggregate([{
      $match: {
        email: userDetails.email,
        roleId: mongoose.Types.ObjectId(userDetails.role)
      },
    },
      {
        $lookup: {
          from: 'roles',
          localField: 'roleId',
          foreignField: '_id',
          as: 'roleDetails'
        }
      },
      {
        $project: {
          email: 1,
          roleId: 1,
          role: {
            $first: "$roleDetails"
          },
          name: "$role.name",
          firstName: 1,
          lastName: 1
        }
      },
      {
        $project: {
          email: 1,
          roleId: 1,
          name: "$role.name",
          firstName: 1,
          lastName: 1
        }
      },
      {
        $limit: 1
    }
    ]);
    if (!adminUserDetails.length) {
      return responseService.returnToResponse(res, {}, 400, '', 'Invalid user')
    }
    if (adminUserDetails[0].name !== 'admin') {
      return responseService.returnToResponse(res, {}, 403, '', 'You do not have permission to invite user')
    }
    req.user = adminUserDetails[0]
    next()
  } catch (error) {
    return responseService.returnToResponse(res, {}, 401, '', 'Unauthorised')
  }

}

module.exports.verifyUser = async (req, res, next) => {
  try {
    if (!req?.headers?.authorization) {
      return responseService.returnToResponse(res, {}, 401, '', 'Unauthorised')
    }
    const token = req.headers.authorization.split(" ")[1];
    const userDetails = await tokenService.decodeJWTToken(token);
    const userExists = await adminModel.findOne({ email: userDetails.email }, { _id: 1, email: 1, firstName: 1, lastName: 1 }).lean().exec()
    if (!userExists) {
      return responseService.returnToResponse(res, {}, 400, '', 'Invalid user')
    }
    req.user = userExists
    next()
  } catch (error) {
    return responseService.returnToResponse(res, {}, 401, '', 'Unauthorised')
  }

}