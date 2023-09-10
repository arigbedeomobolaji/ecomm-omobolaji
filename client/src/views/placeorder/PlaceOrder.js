// jshint ignore:start

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createOrder } from '../../actions/orderActions';
import MessageBox from '../../components/messagebox/MessageBox';
import ProgressBar from '../../components/progressbar/ProgressBar';
import { ORDER_CREATE_RESET } from '../../constants/orderConstants';

const PlaceOrder = (props) => {
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart);
	const { shippingAddress, cartPaymentMethod, cartItems } = cart;
	const orderItems = useSelector((state) => state.order);
	const { orderDetails, success, loading, error } = orderItems;
	if (!shippingAddress.address) {
		props.history.push('/shipping');
	}
	const toPrice = (num) => Number(Number(num).toFixed(2));
	const taxPercent = 0.1;
	cart.itemsPrice = toPrice(
		cartItems.reduce((acc, current) => acc + current.price * current.qty, 0)
	);
	cart.shippingPrice =
		cartItems.length > 5 ? 100 : cartItems.length > 0 ? 20 : 0;
	cart.taxPrice = toPrice(Number(cart.itemsPrice) * taxPercent);
	cart.orderTotal = toPrice(
		Number(cart.itemsPrice) +
			Number(cart.shippingPrice) +
			Number(cart.taxPrice)
	);
	const placeOrderHandler = () => {
		dispatch(
			createOrder({
				orderItems: cart.cartItems,
				shippingAddress,
				paymentMethod: cartPaymentMethod,
				itemsPrice: cart.itemsPrice,
				shippingPrice: cart.shippingPrice,
				taxPrice: cart.taxPrice,
				totalPrice: cart.orderTotal,
			})
		);
	};
	useEffect(() => {
		if (success) {
			const orderId = orderDetails._id;
			props.history.push(`/orders/${orderId}`);
			dispatch({ type: ORDER_CREATE_RESET });
		}
	}, [success, props.history, dispatch, orderDetails]);

	return (
		<div>
			<ProgressBar signin shipping payment placeOrder />
			<div className='row'>
				<div className='col-lg'>
					<div className='block'>
						<h3>Shipping</h3>
						<p>
							<strong>Name: </strong> &nbsp;&nbsp;{' '}
							{shippingAddress.fullname}
						</p>
						<p>
							<strong>Address:</strong> &nbsp;&nbsp;{' '}
							{shippingAddress.address}, {shippingAddress.city}
						</p>
					</div>
					<div className='block'>
						<h3>Payment</h3>
						<p>
							{' '}
							<strong> Method: </strong> &nbsp;&nbsp;{' '}
							{cartPaymentMethod}
						</p>
					</div>
					<div className='block'>
						<h3>Order items</h3>
						{cartItems.map((item) => (
							<div key={`${item.name}`} className='row force'>
								<div>
									<img
										className='small__card'
										src={`https://omobolaji-ecomm-bucket.s3.eu-west-2.amazonaws.com/${item.image}`}
										alt={`${item.name}`}
									/>
								</div>
								<div>
									<strong>{item.name}</strong>
								</div>
								<div>
									{item.qty} x {item.price} ={' '}
									{item.qty * item.price}
								</div>
							</div>
						))}
					</div>
				</div>
				<div className='col-sm'>
					<div className='block'>
						<h3> Order Summary</h3>
						<div className='row force'>
							<div>Items</div>
							<div>₦ {cart.itemsPrice.toFixed(2)}</div>
						</div>
						<div className='row force'>
							<div>Shipping</div>
							<div>
								₦ {toPrice(cart.shippingPrice).toFixed(2)}
							</div>
						</div>
						<div className='row force'>
							<div>Tax</div>
							<div>₦ {cart.taxPrice.toFixed(2)}</div>
						</div>
						<div className='row force'>
							<div>
								<strong>Order Total</strong>
							</div>
							<div>
								<strong>₦ {cart.orderTotal.toFixed(2)}</strong>
							</div>
						</div>
						<button
							type='button'
							onClick={placeOrderHandler}
							className='button button--primary button--block'
							disabled={cartItems.length === 0 || loading}
						>
							Place Order
						</button>
					</div>
					{error && (
						<MessageBox variant={'danger'}> {error} </MessageBox>
					)}
				</div>
			</div>
		</div>
	);
};

export default PlaceOrder;
