import Razorpay from "razorpay";

///Here i am creating razorpay instance so that i can connect my nodejs app with razorpay server.
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

export default razorpayInstance;
