const Doctor=require('../models/Doctor')
const Appointment=require('../models/Appointment')

async function bookAppointment(req,res) {
    console.log(req.body)
     try{
            const newAppointment=await Appointment(req.body)
            
            const savedAppointment=await newAppointment.save()
            
            return res.status(201).json(savedAppointment)
        }
        catch(error)
        {
            console.log(error)
            return res.status(400).json({error:error.message})
        }
}

module.exports={bookAppointment}