import dotenv from 'dotenv'
dotenv.config();
import { connectDB } from './config/connectDB.js';
import fastify from 'fastify';
import {registerRoutes} from './routes/index.js'
import fastifySocketIO from 'fastify-socket.io';
import { admin, buildAdminRouter } from './config/setup.js';
const PORT=process.env.PORT || 5000
const start = async ()=>{
     await connectDB();
      const app=fastify()
      app.register(fastifySocketIO,{
        cors:{origin:'*'},
        pingInterval:10000,
        pingTimeout:5000,
        transports:['webSocket']
      })
      await registerRoutes(app)
      await buildAdminRouter(app)
      app.listen({port:PORT,host:'0.0.0.0'},(err,addr)=>{
        if(err){
            console.error(err)
        }
        else{
            console.info(`GroceryApp running on http://localhost:${PORT}${admin.options.rootPath}`)
        }
      })

      app.ready().then(()=>{
        app.io.on('connection',(socket)=>{
          console.log('A user connected')
          socket.on('joinRoom',(orderId)=>{
            socket.join(orderId);
            console.log(`User join room ${orderId}`)
          })
          socket.on('disconnect',()=>{
            console.log('User Disconnected')
          })
        })
      })
}
start()