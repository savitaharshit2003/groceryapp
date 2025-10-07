import { authRoutes } from "./auth.js";
import { orderRoutes } from "./order.js";
import {categoryRoutes,productRoutes}from './product.js'

const prefix='/api' //version update hote rhte hai uske liye prefix use kiya 

export const registerRoutes= async (fastify)=>{
    fastify.register(authRoutes,{prefix:prefix});
    fastify.register(productRoutes,{prefix:prefix});
    fastify.register(categoryRoutes,{prefix:prefix});
    fastify.register(orderRoutes,{prefix:prefix})
}
