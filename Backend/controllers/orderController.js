import razorpay from 'razorpay'
import dotenv from "dotenv"
dotenv.config()
import Course from "../Model/courseModel.js";
import User from '../Model/userModel.js';




const razorPayInstance =  new razorpay({
   key_id: process.env.RAZORPAY_KEY_ID,
   key_secret: process.env.RAZORPAY_KEY_SECRET  
})

export const RazorpayOrder = async (req,res) => {
  try {
    const {courseId,userId} = req.body;

    const course = await Course.findById(courseId);

    if(!course){
      return res.status(404).json({ message: "Course not found" });
    } 
    const options = {
      amount: course.price * 100,
      currency: "INR",
      receipt: `receipt_${userId.toString()}`,
      payment_capture: 1
    };

    const order =  await razorPayInstance.orders.create(options);
    return res.status(200).json({success:true, order})
  } catch (error) {
    console.log("Razorpay order error", error);
    return res.status(500).json({ message: `failed to create razorpay order ${error}` }); 
  }
}





export const verifyPayment = async (req,res) => {

  try {
    const {courseId,userId,razorpay_order_id} = req.body;
    console.log("verify payment called with :" ,req.body)

    const orderInfo = await razorPayInstance.orders.fetch(razorpay_order_id);
        console.log("orderInfo:", orderInfo);

    if(orderInfo.status === "paid"){
      const user = await User.findById(userId);
            console.log("🟢 User found:", user);



      if(!user) {
        return res.status(404).json({ message: "User not found" });
      }


      
      if(!user.enrolledCourses.includes(courseId)){
        await user.enrolledCourses.push(courseId);
        await user.save({ validateBeforeSave: false });
      } 
      const course = await Course.findById(courseId).populate("lectures");

      if (!course.enrolledStudents.includes(userId)) {
        await course.enrolledStudents.push(userId);
        await course.save({ validateBeforeSave: false });  
      } 
      return res.status(200).json({ message: "Payment verified successfully" });
    } else {
      return res.status(400).json({ message: "Payment failed" });
    }
  

  } catch (error) {
    console.log("Payment verification error:", error);
     return res.status(500).json({ message: ` Internal server error: Payment verification failed ${error}` });
  }

}