import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDb from './config/connectDB.js';
import cookieParser from 'cookie-parser';
import authRouter from './route/authRoute.js';
import cors from 'cors';
import userRouter from './route/userRoute.js';
import courseRouter from './route/courseRoute.js';
import paymentRouter from './route/paymentRoute.js';
import reviewRouter from './route/reviewRoute.js';



const port = process.env.PORT
const app = express();

app.use(express.json());
app.use(cookieParser());

// frontend or backend ko apas me connect karne ke liye use kiya jata hai
app.use(cors({
  origin: "https://learing-management-system-frontend.onrender.com",
  credentials: true
}));

app.use("/api/auth", authRouter);
app.use("/api/user",userRouter)
app.use("/api/course",courseRouter)
app.use("/api/order",paymentRouter)
app.use("/api/review",reviewRouter)


app.get("/", (req, res) => {
  res.send('Hello from server');
});

// app.listen(port, () => {
//   console.log("Server Started");
//   connectDb();
// });

connectDb().then(() => {
  app.listen(port, () => {
    console.log("Server Started");
  });
}).catch((err) => {
  console.error("DB connection failed:", err);
});


export default app;
