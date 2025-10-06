import Order from '../../models/index.js'
import Branch from '../../models/index.js'
import {Customer,DeliveryPartner} from '../../models/index.js'


export const createOrder=async(req,rep)=>{
    try {
        const {userId}= req.user;
        const {items,branch,totalPrice}= req.body;
        const customerData= await Customer.findById(userId);
        const branchData= await Branch.findById(userId);
        if(!customerData){
            return rep.status(404).send({message:'Customer not found'})
        }
        const newOrder= new Order({
            customer:userId,
            items:items.map((item)=>({
                id:item.id,
                item:item.item,
                count:item.count
            })),
            branch,
            totalPrice,
            deliveryLocation:{
                latitude:customerData.liveLocation.latitude,
                longitude:customerData.liveLocation.longitude,
                address:customerData.address || 'No address availabe'
            },
            pickupLocation:{
                latitude:branchData.liveLocation.latitude,
                longitude:branchData.liveLocation.longitude,
                address:branchData.address || 'No address availabe'
            }
        });
        const saveOrder=await newOrder.save();
        return rep.status(201).send(saveOrder);

    } catch (error) {
        console.error(error);
        return rep.status(500).send({message:'failed to create order',error})
    }
}

export const confirmOrder=async(req,rep)=>{
    try {
        const{orderId}=req.params;
        const {userId}=req.user;
        const{deliveryPersonLocation}=req.body;

        const deliveryPerson= await DeliveryPartner.findById(userId);
        if(!deliveryPerson){
            return rep.status(404).send({message:'Delivery person not found'});
        }
        const order=await Order.findById(userId);
        if(!order){
            return rep.status(404).send({message:'Order not found'});
        }
        if(order.status !== 'available'){
            return rep.status(400).send({message:'Order is not available'});
        }
        order.status='confirmed';
        order.deliveryPersonLocation={
            latitude:deliveryPersonLocation?.latitude,
            longitude:deliveryPersonLocation?.longitude,
            address:deliveryPersonLocation.address || ""
        }
        req.server.io.to(orderId).emit('Order Confirmed',order)  //socket.io use kiya hai, real time check ke liye
        await order.save();
        return rep.send(order )
    } catch (error) {
        return rep.status(500).send({message:'Failed to confirm order',error})
    }
}