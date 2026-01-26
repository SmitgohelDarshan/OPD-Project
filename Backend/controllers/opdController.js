const OPD = require('../models/OPD');

const registerOPD = async(req,res)=>{
    try {
        const newOPD = await OPD.insertOne(req.body);

        return res.status(201).json(newOPD)
    } catch (error) {
        return res.status(400).error({error:error.message});
    }
}

const getOPDById = async(req,res)=>{
    try {
        console.log(req.params.id)
        const OPDs = await OPD.find({OPDID:req.params.id});

        return res.status(201).json(OPDs)
    } catch (error) {
        return res.status(400).error({error:error.message});
    }
}

const getAllOPDs = async(req,res)=>{
    try {
        const opds = await OPD.find({});
        
        return res.status(201).json(opds)
    } catch (error) {
        console.log(error)
        return res.status(400).json({error:error.message});
    }
}

const updateOPD = async(req,res)=>{
    try {
        const opd = await OPD.findOneAndUpdate({OPDID:req.params.id}, req.body);
        return res.status(201).json(opd)
    } catch (error) {
        return res.status(400).error({error:error.message});
    }
}

const deleteOPD = async(req,res)=>{
    try {
        const opd = await OPD.findOneAndDelete({OPDID:req.params.id});

        return res.status(201).json(opd)
    } catch (error) {
        return res.status(400).error({error:error.message});        
    }
}

module.exports = {registerOPD, getOPDById, getAllOPDs, updateOPD, deleteOPD};