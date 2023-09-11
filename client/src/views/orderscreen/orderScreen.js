// jshint ignore:start

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PaystackButton } from "react-paystack";
import axios from "axios";
import moment from "moment";
import { orderDetailsAction, orderPayAction } from "../../actions/orderActions";
import MessageBox from "../../components/messagebox/MessageBox";
import LoadingBox from "../../components/loadingbox/LoadingBox";
import { ORDER_PAY_RESET } from "../../constants/orderConstants";
import apiBaseUrl from "../../util";

const OrderScreen = (props) => {
	const orderId = props.match.params.id;
	const dispatch = useDispatch();
	const [amount, setAmount] = useState("");
	const [publicKey, setPublicKey] = useState("");
	const toPrice = (price) => Number(Number(price).toFixed(2));
	const userSignin = useSelector((state) => state.userSignin);
	const {
		userInfo: { name, email },
	} = userSignin;
	const orderDetails = useSelector((state) => state.orderDetails);
	const { order, loading, error } = orderDetails;
	const orderPay = useSelector((state) => state.orderPay);
	const {
		loading: loadingPay,
		error: errorPay,
		success: successPay,
	} = orderPay;

	const paystackComponentProps = {
		email,
		amount: amount * 100,
		publicKey,
		text: "Pay Now via PayStack",
		onSuccess: (reference) => {
			reference.name = name;
			reference.email = email;
			reference.update_time = Date.now();
			dispatch(orderPayAction(order, reference));
		},
		onClose: () => {
			alert("Wait! you need this product don't close");
		},
	};

	// Fetch Order from database
	useEffect(() => {
		const fetchPaystackData = async () => {
			const { data } = await axios.get(
				`${apiBaseUrl}/api/config/paystack`
			);
			if (data) {
				setPublicKey(data);
			}
		};
		if (!order || successPay || (order && order._id !== orderId)) {
			dispatch({ type: ORDER_PAY_RESET });
			dispatch(orderDetailsAction(orderId));
		} else {
			if (order._id) {
				if (!order.isPaid) {
					fetchPaystackData();
					setAmount(order.totalPrice);
				}
			}
		}
	}, [dispatch, order, orderId, successPay]);

	return loading ? (
		<LoadingBox></LoadingBox>
	) : error ? (
		<MessageBox variant={"danger"} />
	) : (
		<div>
			<h3 className="row">Order {order._id} </h3>
			<div className="row">
				<div className="col-lg">
					<div className="block">
						<h3>Shipping</h3>
						<p>
							<strong>Name: </strong> &nbsp;&nbsp;{" "}
							{order.shippingAddress.fullname}
						</p>
						<p>
							<strong>Address:</strong> &nbsp;&nbsp;{" "}
							{order.shippingAddress.address},{" "}
							{order.shippingAddress.city}
						</p>
						{order.isDelivered ? (
							<MessageBox variant={"success"}>
								Delivered at {order.deliveryDate}
							</MessageBox>
						) : (
							<MessageBox variant={"danger"}>
								Not Delivered
							</MessageBox>
						)}
					</div>
					<div className="block">
						<h3>Payment</h3>
						<p>
							{" "}
							<strong> Method: </strong> &nbsp;&nbsp;{" "}
							{order.paymentMethod}
						</p>
						{loadingPay ? (
							<LoadingBox></LoadingBox>
						) : errorPay ? (
							<MessageBox variant={"danger"}>
								{errorPay}
							</MessageBox>
						) : order.isPaid ? (
							<MessageBox variant={"success"}>
								Paid on{" "}
								{moment(order.paidDate).format(
									"dddd, MMMM Do YYYY, h:mm:ss a"
								)}
							</MessageBox>
						) : (
							<MessageBox variant={"danger"}>Not Paid</MessageBox>
						)}
					</div>
					<div className="block">
						<h3>Order items</h3>
						{order.orderItems.map((item) => (
							<div key={`${item.name}`} className="row force">
								<div>
									<img
										className="small__card"
										// src={`https://omobolaji-ecomm-bucket.s3.eu-west-2.amazonaws.com/${item.image}`}
										src={`${item.image}`}
										alt={`${item.name}`}
									/>
								</div>
								<div>
									<strong>{item.name}</strong>
								</div>
								<div>
									{item.qty} x {item.price} ={" "}
									{item.qty * item.price}
								</div>
							</div>
						))}
					</div>
				</div>
				<div className="col-sm">
					<div className="block">
						<h3> Order Summary</h3>
						<div className="row force">
							<div>Items</div>
							<div>₦{order.itemsPrice.toFixed(2)}</div>
						</div>
						<div className="row force">
							<div>Shipping</div>
							<div>
								₦{toPrice(order.shippingPrice).toFixed(2)}
							</div>
						</div>
						<div className="row force">
							<div>Tax</div>
							<div>₦{order.taxPrice.toFixed(2)}</div>
						</div>
						<div className="row force">
							<div>
								<strong>Order Total</strong>
							</div>
							<div>
								<strong>₦{order.totalPrice.toFixed(2)}</strong>
							</div>
						</div>
						<div className="row force">
							{!order.isPaid &&
							order.paymentMethod === "paystack" ? (
								<PaystackButton
									className="button button--primary button--block"
									{...paystackComponentProps}
								></PaystackButton>
							) : (
								<button
									type="button"
									className="button button--primary button--block"
									disabled={order.isPaid}
								>
									Pay Now
								</button>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderScreen;
