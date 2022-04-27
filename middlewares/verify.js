const tokenService = require('../helpers/jwt')
const adminModel = require('../models/employee')

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
      throw new Error('Unauthorised access,please provide token')
    }
    const token = req.headers.authorization.split(" ")[1];
    const userDetails = await tokenService.decodeJWTToken(token);
    const adminUserDetails = await adminModel.findOne({ email: userDetails.email }, { email: 1, _id: 1, roleId: 1 }).populate({ path: 'role', select: 'name' }).lean().exec()
    if (!adminUserDetails) {
      throw new Error('Invalid user')
    }
    if (adminUserDetails.roleId.name !== 'admin') {
      throw new Error('You do not have permission to invite user')
    }
    const { _id, email } = userDetails
    req.user = {
      email,
      _id
    }
    next()
  } catch (error) {
    throw new Error('Failed to validate token')
  }

}