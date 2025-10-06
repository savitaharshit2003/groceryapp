import dotenv from 'dotenv'
dotenv.config();
import { connectDB } from './config/connectDB.js';
import fastify from 'fastify';
const PORT=process.env.PORT || 5000
const start = async ()=>{
     await connectDB();
      const app=fastify()
      app.listen({port:PORT,host:'0.0.0.0'},(err,addr)=>{
        if(err){
            console.error(err)
        }
        else{
            console.info(`GroceryApp running on http://localhost:${PORT}`)
        }
      })
}
start()