// jshint ignore:start
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCartAction } from "../../actions/cartActions";
import CartItem from "../../components/cartItem/CartItem";
import MessageBox from "../../components/messagebox/MessageBox";
import "./cart.css";

const Cart = (props) => {
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;

	const productId = props.match.params.id;
	const qty = props.location.search
		? parseInt(props.location.search.split("=")[1], 10)
		: 1;

	useEffect(() => {
		if (productId) {
			dispatch(addToCartAction(productId, qty));
		}
	}, [dispatch, productId, qty]);
	const handleProceedToCheckout = () => {
		props.history.push("/signin?redirect=shipping");
	};
	return (
		<div className="container">
			<div className="cards">
				<div className="cart__details">
					<h2 className="cart__details__title">Shopping Cart</h2>
					{cartItems.length === 0 ? (
						<MessageBox>
							<Link to="/">
								No Item in the cart. Let's go Shopping
							</Link>
						</MessageBox>
					) : (
						cartItems.map((cartItem) => (
							<CartItem key={cartItem.product} {...cartItem} />
						))
					)}
				</div>
				<div className="cart__checkout">
					<div className="checkout__subtotal">
						Subtotal (
						{cartItems.reduce(
							(acc, current) => acc + current.qty,
							0
						)}{" "}
						items) : &nbsp; ₦{" "}
						{cartItems.reduce(
							(acc, current) => acc + current.price * current.qty,
							0
						)}
					</div>
					<button
						className="button button--block button--primary"
						type="button"
						onClick={handleProceedToCheckout}
						disabled={cartItems.length === 0}
					>
						Proceed to Checkout
					</button>
				</div>
			</div>
		</div>
	);
};

export default Cart;
