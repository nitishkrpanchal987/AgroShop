const categroyModel = require("../models/categoryModels");
const slugify = require('slugify');

const createCategoryController = async(req, res)=>{
    try{
        const {name} = req.body;
        if(!name){
            return res.status(422).json({message:"name is required"});
        }
        const existingCategory = await categroyModel.findOne({name});
        if(existingCategory){
            return res.status(200).send({
                success:true,
                message:"Category already exists"
            })
        }
        const category = await categroyModel({name, slug:slugify(name)}).save();
        res.status(200).send({
            success:true,
            category,
            message:'new category created'
        })
    }catch(err){
        //console.log(err);
        res.status(500).send({
            success:false,
            err,
            message:"error in category"
        })
    }
}

const updateCategoryController = async (req, res)=>{
    try {
        const {name} = req.body;
        const {id} = req.params;
        const category = await categroyModel.findByIdAndUpdate(id, {name, slug:slugify(name)}, {new:true});
        res.status(200).send({
            success:true,
            category,
            message:"category updated successfully"
        })
    } catch (error) {
        //console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"Error while updating category"
        })
    }
}


const categoryController = async (req, res)=>{
    try {
        const category = await categroyModel.find({});
        res.status(200).send({
            success:true,
            message:"All categories list",
            category
        });
    } catch (error) {
        //console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:'error while getting category'
        })
    }
}

const singleCategoryController = async(req, res)=>{
    try {
        const {slug} = req.params;
        const category = await categroyModel.findOne({slug});
        res.status(200).send({
            success:true,
            message:"slug categories list",
            category
        })
    } catch (error) {
        //console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:'error while getting single category'
        })
    }
}

const deleteCategoryController = async (req, res)=>{
    try {
        const {id} = req.params;
        const category = await categroyModel.findByIdAndDelete(id);
        res.status(200).send({
            success:true,
            message:"slug categories deleted",
            category
        })
    } catch (error) {
        //console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:'error while deleting category'
        })
    }
}
module.exports = {createCategoryController, updateCategoryController, categoryController, singleCategoryController, deleteCategoryController};