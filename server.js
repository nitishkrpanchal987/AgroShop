const express = require("express");
const app = express();
const morgan = require('morgan');
const {connectDB} = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/CategoryRoutes')
const productRoutes = require('./routes/productRoutes')
require('dotenv').config()
const cors = require('cors');
const path = require('path')
// const static = require('./ecommerce/build');
// const index = require('./ecommerce/build/index.html')
const port = process.env.PORT || 3001;

connectDB();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
// app.use(express.static(path.join(__dirname, static)));

//routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/product', productRoutes);

// app.use('*', function(req, res){
//     res.sendFile(path.join(__dirname, index))
// })

app.listen(port, ()=>{
    //console.log('connected to server');
})