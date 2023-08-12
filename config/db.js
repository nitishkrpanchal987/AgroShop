const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = async() =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log('connnected to database ' + conn.connection.host);
    }catch(error){
        console.log(`error in MongoDb ${error}`);
    }
}


module.exports = {connectDB};