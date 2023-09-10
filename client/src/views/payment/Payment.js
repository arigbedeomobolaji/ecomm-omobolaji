import React, { useState } from "react";
import ProgressBar from "../../components/progressbar/ProgressBar";
import { useDispatch, useSelector } from "react-redux";
import { saveCartPaymentMethod } from "../../actions/cartActions";

const Payment = (props) => {
	const [paymentMethod, setPaymentMethod] = useState("paystack");
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;
	const dispatch = useDispatch();

	if (!shippingAddress.address) {
		props.history.push("/shipping");
	}

	const submitHandler = (e) => {
		alert("Please try in incognito mode if clicking result to error");
		e.preventDefault();
		dispatch(saveCartPaymentMethod(paymentMethod));
		props.history.push("/placeorder");
	};

	return (
		<>
			<ProgressBar signin shipping payment></ProgressBar>
			<form className="form container" onSubmit={submitHandler}>
				<div className="form__group">
					<h1>Payment</h1>
				</div>
				<div className="form__group radio">
					<input
						className="form__input"
						type="radio"
						name="payment"
						id="paystack"
						value="paystack"
						checked
						onChange={(e) => setPaymentMethod(e.target.value)}
					></input>
					<label className="form__label" htmlFor="paypal">
						Paystack
					</label>
				</div>
				<div className="form__group radio">
					<input
						className="form__input"
						type="radio"
						name="payment"
						id="flutterwave"
						value="flutterwave"
						onChange={(e) => setPaymentMethod(e.target.value)}
					></input>
					<label className="form__label" htmlFor="stripe">
						Flutterwave
					</label>
				</div>
				<div className="form__group">
					<label />
					<button type="submit" className="button button--primary">
						Submit
					</button>
				</div>
			</form>
		</>
	);
};

export default Payment;
