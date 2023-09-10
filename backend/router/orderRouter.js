import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../model/Order.js';
import { verifyAuthToken } from '../utils.js';

const orderRouter = express.Router();

orderRouter.get(
	'/mine',
	verifyAuthToken,
	expressAsyncHandler(async (req, res) => {
		try {
			const orders = await Order.find({ user: req.user._id });
			res.send(orders);
		} catch (err) {
			res.send({ error: err.message || err });
		}
	})
);

orderRouter.post(
	'/create',
	verifyAuthToken,
	expressAsyncHandler(async (req, res) => {
		const {
			orderItems,
			shippingAddress,
			paymentMethod,
			itemsPrice,
			shippingPrice,
			taxPrice,
			totalPrice,
		} = req.body;

		if (orderItems.length === 0) {
			return res
				.status(400)
				.send({ error: 'orderItems cannot be empty' });
		} else {
			const newOrder = new Order({
				orderItems,
				shippingAddress,
				paymentMethod,
				itemsPrice,
				shippingPrice,
				taxPrice,
				totalPrice,
				user: req.user._id,
			});
			const createdOrder = await newOrder.save();
			if (!createdOrder._id) {
				return res
					.status(500)
					.send('There is an error saving newOrder');
			} else {
				res.status(201).send({
					message: 'New order succesfully saved.',
					createdOrder,
				});
			}
		}
	})
);

// Fect details of a particular order
orderRouter.get(
	'/:id',
	verifyAuthToken,
	expressAsyncHandler(async (req, res) => {
		const id = req.params.id;
		try {
			const order = await Order.findById(id);
			if (typeof order === 'object' && order._id !== undefined) {
				return res.status(200).send({ order });
			}
		} catch (err) {
			res.status(404).send({
				error: 'No order with the specified id found',
				errDetail: err,
			});
		}
	})
);

orderRouter.put(
	'/:id/pay',
	verifyAuthToken,
	expressAsyncHandler(async (req, res) => {
		const id = req.params.id;
		const {
			reference,
			status,
			email,
			update_time: updateTime,
			message,
		} = req.body;
		try {
			const order = await Order.findById(id);
			if (
				order._id.toString() === id &&
				status.toLowerCase() === 'success'
			) {
				order.isPaid = true;
				order.paidDate = updateTime;
				order.paymentResult = {
					reference,
					status,
					updateTime,
					email,
					message,
				};

				const updatedOrder = await order.save();
				res.status(201).send({
					updatedOrder,
					message: `order ${order._id} successfully saved.`,
				});
			}
		} catch (err) {
			res.status(404).send({
				error: 'Error has occurred',
				message: err.message,
			});
		}
	})
);

export default orderRouter;
