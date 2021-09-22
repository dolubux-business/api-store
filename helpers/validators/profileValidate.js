const joi = require('@hapi/joi')

//Handle validation of sign up
const ProfileValidation = (data) => {
  const Schema = joi.object({
    profile_last_name: joi.string().min(3).required(),
    profile_first_name: joi.string().min(3).required(),
    profile_avatar: joi.string().required(),
    profile_country: joi.string().required(),
    profile_city: joi.string().min(3).required(),

    stores_name: joi.string().min(3).required(),
    stores_logo: joi.string().required(),
    stores_solgan: joi.string().lowercase().min(6),
    stores_contacts_tel: joi.string().pattern(/^d+$/),
    stores_contacts_wa: joi.string().pattern(/^d+$/),
    stores_contacts_insta: joi.string().pattern(/^d+$/),
    stores_contacts_mger: joi.string().pattern(/^d+$/),

    bio: joi.string().min(6).required(),
  })

  return Schema.validate(data)
}

//EXPORT ALL INSTANCE OF VALIDATIONS
module.exports.ProfileValidation = ProfileValidation
