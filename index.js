const express = require("express")
const app = express()
const port = process.env.PORT || 4000
const cors = require("cors")
require("dotenv").config()
const mongoose = require("mongoose");
const Product = require("./models/productModel")



mongoose.set("strictQuery", false);
const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.DATABASE_URL)
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

app.use(express.json())
app.use(cors())

app.get('/products', async (req, res) => {
    const product = await Product.find()
    if(product){
        res.json(product)
    }
    else{
        res.send("Something wents wrong")
    }

})

app.get('/',  (req, res) => {
    
    res.send("test server connected")
})


app.get('/')
connectDB().then(()=>{
    app.listen(port, ()=> {
        console.log(`Server running with ${port}`)
    })
})