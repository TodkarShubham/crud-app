const { ObjectId } = require('bson')
const mongoose= require('mongoose')

//creating productmaster schema
const productschema= new mongoose.Schema({
    product_name:{
        type:String,
        required:true,
        trim:true
    },
    category_id:{
        type:String,
        required:true
    },
    category_name:{
        type:String,
        required:true,
        trim:true
    }
})

//create collection product
const ProductMaster=mongoose.model('ProductMaster',productschema)
module.exports= ProductMaster