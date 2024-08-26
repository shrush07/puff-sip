import {Router} from 'express';
import asyncHandler from 'express-async-handler';
import { HTTP_BAD_REQUEST } from '../constants/http_status';
import { OrderStatus } from '../constants/order_status';
import { OrderModel } from '../models/order.model';


// const router = Router();
const express = require('express');
const router = express.Router();

// router.post('/create',
// asyncHandler(async (req:any, res:any) => {
//     const requestOrder = req.body;

//     if(requestOrder.items.length <= 0){
//         res.status(HTTP_BAD_REQUEST).send('Cart Is Empty!');
//         return;
//     }

//     await OrderModel.deleteOne({
//         user: req.user.id,
//         status: OrderStatus.NEW
//     });

//     const newOrder = new OrderModel({...requestOrder,user: req.user.id});
//     await newOrder.save();
//     res.send(newOrder);
// })
// )

// router.post('/create', async (req:any, res:any) => {
//     try {
//       const orderData = req.body;
//       const newOrder = new OrderModel(orderData);
//       const savedOrder = await newOrder.save();
//       res.status(201).json(savedOrder);
//     } catch (error) {
//       console.error('Error creating order:', error);
//       res.status(500).json({ message: 'Error creating order', error});
//     }
//   });
  
//   module.exports = router;

router.post('/create', async (req: any, res: any) => {
    try {
      const order = new OrderModel(req.body);
      await order.save();
      res.status(201).send(order);
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).send({ error: 'Internal Server Error' });
    }
  });
  

// router.get('/newOrderForCurrentUser', asyncHandler( async (req,res ) => {
//     const order= await getNewOrderForCurrentUser(req);
//     if(order) res.send(order);
//     else res.status(HTTP_BAD_REQUEST).send();
// }))


router.get('/newOrderForCurrentUser', async (req:any, res:any) => {
    try {
      const userId = req.user.id; // Assuming you have user information in the request
      if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
      }
  
      const order = await OrderModel.findOne({ userId, status: 'new' });
      if (!order) {
        return res.status(404).json({ message: 'No new order found for the current user' });
      }
  
      res.json(order);
    } catch (error) {
      console.error('Error fetching new order:', error);
      res.status(500).json({ message: 'Error fetching new order' });
    }
  });

  
  module.exports = router;


router.post('/pay', asyncHandler( async (req:any, res) => {
    const {paymentId} = req.body;
    const order = await getNewOrderForCurrentUser(req);
    if(!order){
        res.status(HTTP_BAD_REQUEST).send('Order Not Found!');
        return;
    }

    order.paymentId = paymentId;
    order.status = OrderStatus.PAYED;
    await order.save();

    res.send(order._id);
}))

router.get('/track/:id', asyncHandler( async (req, res) => {
    const order = await OrderModel.findById(req.params.id);
    res.send(order);
}))

export default router;

async function getNewOrderForCurrentUser(req: any) {
    return await OrderModel.findOne({ user: req.user.id, status: OrderStatus.NEW });
}