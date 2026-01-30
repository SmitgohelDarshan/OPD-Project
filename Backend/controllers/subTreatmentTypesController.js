const SubTreatmentType = require("../models/SubTreatmentTypes")

const registerSubTreatmentType=async(req,res)=>{
    try{
        const newSubTreatmentType=await SubTreatmentType.insertOne(req.body)

        return res.status(201).json(newSubTreatmentType)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}


const getSubTreatmentTypeById=async(req,res)=>{
    try{
        const subTreatment=await SubTreatmentType.find({SubTreatmentTypeID:req.params.id})

        return res.status(201).json(subTreatment)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}

const getAllSubTreatmentTypes=async(req,res)=>{
    try{
        const subTreatments=await SubTreatmentType.find({})

        return res.status(201).json(subTreatments)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}
const updateSubTreatmentType=async(req,res)=>{
    try{
        const subTreatment=await SubTreatmentType.findOneAndUpdate({SubTreatmentTypeID:req.params.id},req.body)

        return res.status(201).json(subTreatment)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}

const deleteSubTreatmentType=async(req,res)=>{
    try{
        const subTreatment=await SubTreatmentType.findOneAndDelete({SubTreatmentTypeID:req.params.id})

        return res.status(201).json(subTreatment)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}
 


module.exports={registerSubTreatmentType,getSubTreatmentTypeById,getAllSubTreatmentTypes,updateSubTreatmentType,deleteSubTreatmentType}