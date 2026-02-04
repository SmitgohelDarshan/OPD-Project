const Joi = require('joi')

const registerSchema = Joi.object({
    PatientID: Joi.number().positive(),
    PatientName: Joi.string().max(250).required(),
    PatientNo: Joi.number().positive().required(),
    RegistrationDateTime: Joi.date().required(),
    Age: Joi.number().positive().required(),
    BloodGroup: Joi.string().min(1).max(20).required(),
    Gender: Joi.string().min(1).max(10).required(),
    Occupation: Joi.string().min(0).max(100),
    Address: Joi.string().max(250),
    HospitalID: Joi.number().required(),
    StateID: Joi.number().positive().required(),
    CityID: Joi.number().positive().required(),
    PinCode: Joi.string().max(10).required(),
    MobileNo: Joi.string().length(10).required(),
    ReferredBy: Joi.string().max(250),
    Description: Joi.string().max(250),
    UserID: Joi.number().positive().required(),
    EmergencyContactNo: Joi.string().max(20).required()
})

module.exports = registerSchema