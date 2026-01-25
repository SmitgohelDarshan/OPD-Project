const Hospital = require("../models/Hospital")

const registerHospital=async(req,res)=>{
    try{
        const newHospital=await Hospital(req.body)

        res.status(201).json(newHospital)
        const savedHospital=await newHospital.save()

        return res.status(201).json(savedHospital)
    }
    catch(error){
        return res.status(400).send({error:error.message})
    }
}

const getHospitalById=async(req,res)=>{
    try {
        const hospital = await Hospital.findById(req.params.id)

        res.status(201).json(hospital)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const getAllHospitals=async(req,res)=>{
    try {
        const Hospitals = await Hospital.find({})
        
        res.status(201).json(Hospitals)
    }
    catch (error) {
        res.status(400).error({error:error.message})
    }
}

const updateHospital=async(req,res)=>{
    try{
        const hospital=await Hospital.findByIdAndUpdate(req.params.id,req.body)

        res.status(201).json(hospital)
    }
    catch(error)
    {
        res.status(400).error({error:error.message})
    }
}

const deleteHospital=async(req,res)=>{
    try {
        const hospital = await Hospital.findByIdAndDelete(req.params.id)

        res.status(201).json(hospital)
    } catch (error) {
        res.status(400).error({error:error.message})
    }
}

module.exports={registerHospital,getHospitalById,getAllHospitals,updateHospital,deleteHospital}