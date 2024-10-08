import { model, Schema, Types } from "mongoose";
import { OrderStatus } from "../constants/order_status";
import { Food, FoodSchema } from "./food.model";

// export interface LatLng{
//     lat: string;
//     lng: string;
// }

// export const LatLngSchema = new Schema<LatLng>(
//     {
//         lat: {type: String, required: true},
//         lng: {type: String, required: true},
//     }
// );

const mongoose = require('mongoose');

export interface OrderItem {
  _id: number;
  food: Food;
  price: number;
  quantity: number;
}

export const OrderItemSchema = new Schema<OrderItem>({
  _id: {type: Number, required: true},
  food: { type: FoodSchema, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

export interface Order {
  _id: string;
  items: OrderItem[];
  totalPrice: number;
  name: string;
  address: string;
  // addressLatLng:LatLng;
  paymentId: string;
  status: OrderStatus;
  user: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema<Order>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    _id: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    paymentId: { type: String },
    totalPrice: { type: Number, required: true },
    items: { type: [OrderItemSchema], required: true },
    status: { type: String, default: OrderStatus.NEW },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

export const OrderModel = model("order", orderSchema);
