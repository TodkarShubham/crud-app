const express= require('express')
const dotenv= require('dotenv').config()
require('./db/mongoose')
const path= require('path')
const hbs=require('hbs')
const bodyparser=require('body-parser')
const CategoryMaster = require('./models/category-model')
const ProductMaster= require('./models/product-model')
const categoryRouter= require('./routers/category-router')
const productRouter= require('./routers/product-router')
const app=express()

const port=process.env.PORT || 3000
//console.log(dotenv.parsed)
//Defines path for express config
const publicDirectoryPath= path.join(__dirname, '../public')
const viewsPath= path.join(__dirname, '../templates/views')
const partialsPath= path.join(__dirname, '../templates/views/partials')

//Setup handlebars and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.use(bodyparser.urlencoded({
    extended:true
}))
app.use(bodyparser.json())
app.use(express.json())

app.use(categoryRouter)
app.use(productRouter)

app.get('', (req,res) =>{
    res.render('index.hbs')
})


app.listen(port,()=>{
    console.log('Server is up on port'+port)
})