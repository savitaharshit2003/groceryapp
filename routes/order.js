import{
    confirmOrder,
    createOrder,
    getOrderById,
    getOrders,
    updatedOrderStatus
}from '../controllers/order/order.js'
import { verifyToken } from '../middleware/auth.js'
export const orderRoutes= async(fastify,options)=>{
    fastify.addHook('preHandler',async (req,rep)=>{
        const isAuthenticated = await verifyToken(req,rep);
        if(!isAuthenticated){
            return rep.code(401).send({message:'Unauthorized'});
        }
    });

    fastify.post('/order',createOrder);
    fastify.get('/order',getOrders);
    fastify.patch('/order/:orderId/status',updatedOrderStatus);;
    fastify.post('/order/:orderId/confirm/',confirmOrder);
    fastify.get('/order/:orderId',getOrderById)
};
