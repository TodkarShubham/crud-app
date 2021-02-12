const mongoose= require('mongoose')

//creating categorymaster schema
const categoryschema= new mongoose.Schema({
    category_name:{
        type:String,
        required:true,
        trim:true
    }
})

//create collection category
const CategoryMaster=mongoose.model('CategoryMaster',categoryschema)
module.exports= CategoryMaster