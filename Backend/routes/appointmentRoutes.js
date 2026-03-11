const express=require('express')
const { bookNextAvailable } = require('../controllers/appointmentController')

const router=express.Router()

router.get('/book',bookNextAvailable)

module.exports=router