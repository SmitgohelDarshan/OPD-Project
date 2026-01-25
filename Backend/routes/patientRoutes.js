const express = require('express');

const validate = require('../middlewares/validate');

const registerSchema = require('../validations/patientValidation');

const { getAllPatients, getPatientById, registerPatient, updatePatient, deletePatient} = require('../controllers/patientController')

const router = express.Router();

router.get('/', getAllPatients);

router.get('/:id', getPatientById);

router.post('/register', validate(registerSchema), registerPatient);

router.put('/update/:id', validate(registerSchema), updatePatient);

router.delete('/delete/:id', validate(registerSchema), deletePatient);

module.exports = router