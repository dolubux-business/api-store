const joi = require('@hapi/joi')

//Handle validation of sign up
const SignUpValidation = (data) => {
   const Schema = joi.object({
      username: joi.string().min(3).max(15).required(),
      email: joi.string().email().required(),
      password: joi.string().min(3).required(),
   })

   return Schema.validate(data)
}

//Handle validation of sign in
const SignInValidation = (data) => {
   const Schema = joi.object({
      email: joi.string().email().required(),
      password: joi.string().min(3).required(),
   })

   return Schema.validate(data)
}

//EXPORT ALL INSTANCE OF VALIDATIONS
module.exports.SignUpValidation = SignUpValidation
module.exports.SignInValidation = SignInValidation
