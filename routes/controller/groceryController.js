const Grocery = require("../model/Grocery")

const getAllGroceries = async(req,res)=>{
    try {
        if(Object.keys(req.query).length === 0){
            let foundGroceries = await Grocery.find({})
            res.json({payload:foundGroceries})
        } else {
            let sortedGroceries = await Grocery.find({}).sort({Date: req.query.date});
            // console.log(sortedGroceries)
            res.json({payload:sortedGroceries})
        }
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

async function sortByPurchased(req,res){
    try {
        let purchased = req.query.purchased
        let isPurchasedOrder = purchased ==="true" ?true:false
        let sortByPurchased = req.query.sort?req.query.sort:null
        let finalSort
        if(!sortByPurchased){
            finalSort = null
        } else{
            finalSort = sortByPurchased === "ascending" ?1 :-1
        }
        let sortedGroceries = await Grocery.find({purchased:isPurchasedOrder}).sort({purchased:finalSort})
        console.log(sortedGroceries)
        res.json({payload:sortedGroceries})
    } catch (error) {
        res.status(500).json({message:"error", error:error.message})
    }
}


module.exports = {
    getAllGroceries,
    createGrocery,
    updateGrocery,
    deleteGrocery,
    sortByPurchased
}