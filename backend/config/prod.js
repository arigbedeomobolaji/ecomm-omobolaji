import dotenv from 'dotenv';
dotenv.config();

export default {
	JWT_SECRET: process.env.JWT_SECRET,
	PAYPAL_CLIENTID: process.env.PAYPAL_CLIENTID,
	PAYSTACK_CLIENTID: process.env.PAYSTACK_CLIENTID,
	MONGO_URI: process.env.MONGO_URI,
	PORT: process.env.PORT,
};
