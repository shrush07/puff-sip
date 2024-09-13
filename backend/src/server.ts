import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import cors from "cors";
import foodRouter from './routers/food.router';
import userRouter from './routers/user.router';
import { dbConnect } from './configs/database.config';
import orderRouter from './routers/order.router';
import contactRouter from './routers/contact.router';   
dbConnect();


const app = express();
app.use(express.json());

app.use(cors({
    credentials: true,
    origin:["http://localhost:4200"]
}));

app.use("/api/foods", foodRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
// app.use("/api/form", contactRouter);



const port = 5000;
app.listen(port, () => {
    console.log(`Backend running at http://localhost:${port}`);
  });
  