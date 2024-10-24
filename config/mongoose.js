const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1);
    }
};

module.exports = connectDB;


// import mongoose from "mongoose";
// // import { DB_NAME } from "../constants.js";

// const connectDB = async () => {
//     try{
//        const connectionInstance = await mongoose.connect(`${process.env.MoNGODB_URI}`)
//        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
//     //    console.log(connectionInstance);
       
       
//     }catch (error) {
//         console.log("MONGODB connection FAILED ", error);
//         process.exit(1) 
        
//     }
// }

// export default connectDB
