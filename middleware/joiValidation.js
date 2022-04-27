
const Joi = require('joi');
      

   exports.adminValidation =(req, res, next)=> {
    const joiSchema = Joi.object({
            fname:Joi.string().alphanum().pattern(/^[a-zA-Z ]{3,30}$/).required().error(new Error("Fname must be text and minimum 3 character")),
            lname:Joi.string().alphanum().pattern(/^[a-zA-Z ]{3,30}$/).required().error(new Error("Lname must be text and minimum 3 character")),
            contact:Joi.string().length(10).pattern(/[6-9]{1}[0-9]{9}/).required().error(new Error("Contact must be 10 digit")),
            email:Joi.string().email().pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).required().error(new Error('Please enter a valid email address')),
            address:Joi.string().required(),
            gender:Joi.string().required(),
            hobby:Joi.string().required(),
            password:Joi.string().pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/).error(new Error("invalid password")),
          
           })
        
          const result = joiSchema.validate(req.body);

          if(result.error){
              res.send(result.error.message);
          }else{
              req.body = result.value;
              next()
          }

    }

    exports.userValidation = (req,res,next) => {
        const joiUserSchema = Joi.object({
                fname:Joi.string().alphanum().pattern(/^[a-zA-Z ]{3,30}$/).required().error(new Error("Fname must be text and minimum 3 character")),
                lname:Joi.string().alphanum().pattern(/^[a-zA-Z ]{3,30}$/).required().error(new Error("Lname must be text and minimum 3 character")),
                email:Joi.string().email().pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).required().error(new Error('Please enter a valid email address')),
                department:Joi.string().pattern(/^[a-zA-Z ]{3,30}$/).required().error(new Error("Department must be text")),
                role:Joi.string().pattern(/^[a-zA-Z ]{3,30}$/).required().error(new Error("Role must be text")),
                username:Joi.string().pattern(/^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/),
                password:Joi.string()
            
            })

            const userResult = joiUserSchema.validate(req.body)

            if(userResult.error){
                res.send(userResult.error.message)
           }else{
               req.body = userResult.value
               next()
           }
    }




 