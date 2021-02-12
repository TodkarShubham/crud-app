const express= require('express')
const CategoryMaster = require('../models/category-model')
const ProductMaster= require('../models/product-model')
const router= new express.Router()

//                  CategoryMaster

//create category
router.post('/category', async(req,res)=>{
    console.log(req.body)
    const category=new CategoryMaster(req.body)
try{
    await category.save()
    res.redirect('/category')
    //res.status(201).send(category)
}catch(error){
   // console.log(error)
    res.status(400).send(error)
}
})

//read all category
router.get('/category', async(req,res)=>{
        try{
            
            const categories=await CategoryMaster.find({})
            console.log(categories)
       //  res.send(categories)
         res.render('categorymaster',{
             category:categories
         })
         //console.log(categories)
    }catch(error){
        res.status(500).send(error)
        //console.log(error)
    }
})

//get update category
router.get('/category/:id',async(req,res)=>{
    try {
        const id=req.params.id
        //const sid=id.toString()
        console.log(id)
        const category= await CategoryMaster.findOneAndUpdate({_id:id}, req.body,{ new: true })
        //const prod= await ProductMaster.updateMany({category_id: id},{$set:{category_name:req.body.category_name}},{new:true})
        if(!category){
        
            res.status(404).send()
        }
        // console.log("HIIIIIII"+category)
        res.render('editcategory',{
            cat:category
        })
    } catch (error) {
        res.status(400).send(error)
    }
})



//Update category
router.post('/category/:id',async(req,res)=>{
    try {
        const id=req.params.id
        //const sid=id.toString()
        console.log(id)
        const category= await CategoryMaster.findByIdAndUpdate({_id:id}, req.body,{ new: true })
        const prod= await ProductMaster.updateMany({category_id: id},{$set:{category_name:req.body.category_name}},{new:true})
        if(!category){
        
            res.status(404).send()
        }
        res.redirect('/category')
        // res.send(category)
    } catch (error) {
        res.status(400).send(error)
    }
})

//Delete Category
router.get('/category/delete/:id', async(req,res)=>{
    try {
        const category= await CategoryMaster.findByIdAndDelete({_id:req.params.id})
       // console.log("For Delete"+req.params.id)
        const product= await ProductMaster.deleteMany({category_id:req.params.id})
        if(!category){
            return res.status(404).send()
        }
         res.redirect('/category')
        //res.send(category)
    } catch (error) {
        res.status(500).send(console.error)
    }
})

module.exports=router