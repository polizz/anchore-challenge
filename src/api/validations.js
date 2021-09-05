const Joi = require('joi')

const personSchema = Joi.object({
  id: Joi.string().allow(''),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  dob: Joi.string().required(),
  phone: Joi.string().required(),
  address: Joi.string().required(),
  notes: Joi.string().allow(''),
})

const validatePostPerson = data => 
  personSchema.validateAsync(data)

module.exports = {
  validatePostPerson,
  personSchema,
}