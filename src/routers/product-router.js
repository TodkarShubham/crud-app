const express= require('express')
const CategoryMaster = require('../models/category-model')
const ProductMaster= require('../models/product-model')
const router= new express.Router()

//          ProductMaster

//Create Product
router.post('/product', async(req,res)=>{
    
    const cat_id=await CategoryMaster.findOne({category_name:req.body.catname},'_id')
    
    const product=new ProductMaster({
         product_name:req.body.product_name,
         category_id:cat_id._id,
         category_name:req.body.catname
    })
try{
    await product.save()
    res.redirect("/product")
    //res.status(201).send(product)
}catch(error){
   // console.log(error)
    res.status(400).send(error)
}
})

//Read all products
router.get('/product', async(req,res)=>{
    try{
        const products=await ProductMaster.find({})
        const categorynames=await CategoryMaster.find({},'category_name').exec() 
        console.log(categorynames)
        //res.send(products)
         res.render('productmaster',{
            product:products,
            categoryname:categorynames
        })
    }catch(error){
        res.status(500).send(error)
        //console.log(error)
    }
})

//get update product
router.get('/product/:id',async(req,res)=>{
    try {
        const id=req.params.id
        //const sid=id.toString()
        console.log(id)
        const product= await ProductMaster.findOneAndUpdate({_id:id}, req.body,{ new: true })
        const categorynames=await CategoryMaster.find({},'category_name').exec()
        if(!product){
        
            res.status(404).send()
        }
         
        res.render('editproduct',{
            prod:product,
            catnames:categorynames
        })
    } catch (error) {
        res.status(400).send(error)
    }
})



//Update Product
router.post('/product/:id',async(req,res)=>{
    try {
        const id=req.params.id
        console.log("catid"+req.body.category_id)
        console.log("catname"+req.body.catname)
        const cat_id=await CategoryMaster.findOne({category_name:req.body.catname},'_id')
        console.log(cat_id)
        const product= await ProductMaster.findByIdAndUpdate({_id:id},{
            product_name:req.body.product_name,
            category_id:cat_id._id,
            category_name:req.body.catname
       },{ new: true })
        
        if(!product){
        
            res.status(404).send()
        }
        // res.send(product)
        res.redirect('/product')
    } catch (error) {
        res.status(400).send(error)
    }
})

//Delete Product
router.get('/product/delete/:id', async(req,res)=>{
    try {
        const product= await ProductMaster.findByIdAndDelete({_id:req.params.id})
        if(!product){
            return res.status(404).send()
        }
        //res.send(product)
        res.redirect('/product')
    } catch (error) {
        res.status(500).send(console.error)
    }
})


module.exports=router
