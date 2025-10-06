import mongoose from "mongoose";
import dotenv from 'dotenv'
export const connectDB=async()=>{
    try {
        const Connect= await mongoose.connect(process.env.MONGO_URI);
        console.info(`DataBase Connected ${Connect.connection.host}`)
    } catch (error) {
        console.error('DataBase Not Connected!',error);
        process.exit(1); //failed
    }

}