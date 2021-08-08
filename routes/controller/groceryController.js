const Grocery = require("../model/Grocery")

const getAllGroceries = async(req,res)=>{
    try {
        let payload = await Grocery.find({})
        res.json(payload)
    } catch (e) {
        res.status(500).json({error:e, message:e.message})
    }
}

const createGrocery = async(req,res)=>{
    const {grocery, purchased, date} = req.body
    try {
        let newGrocery = new Grocery({
            grocery,
            purchased,
            date
        })
        let savedGrocery = await newGrocery.save()
        res.json(savedGrocery)
    } catch (e) {
        res.status(500).json({error:e, message:e.message})
    }
}

const updateGrocery = async(req,res)=>{

    try {
        let updatedGrocery = await Grocery.findByIdAndUpdate(req.params.id, req.body, {new:true})
        res.json(updatedGrocery)
    } catch (e) {
        res.status(500).json({error:e, message:e.message})
    }
}

const deleteGrocery = async(req,res)=>{
    try {
        let deletedGrocery = await Grocery.findByIdAndDelete(req.params.id)
        res.json(deletedGrocery)
    } catch (e) {
        res.status(500).json({error:e, message:e.message})
    }
}

module.exports = {
    getAllGroceries,
    createGrocery,
    updateGrocery,
    deleteGrocery,
}