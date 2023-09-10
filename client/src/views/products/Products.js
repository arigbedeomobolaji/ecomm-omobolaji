// jshint ignore:start
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./products.css";
import LoadingBox from "../../components/loadingbox/LoadingBox";
import MessageBox from "../../components/messagebox/MessageBox";
import { productDetailsAction } from "../../actions/productListAction";
import Rating from "../../components/rating/Rating";

const Products = (props) => {
	const productId = props.match.params.id;
	const [qty, setQty] = useState(1);
	const dispatch = useDispatch();
	const productDetails = useSelector((state) => state.productDetails);
	const { loading, product, error } = productDetails;

	useEffect(() => {
		dispatch(productDetailsAction(productId));
	}, [dispatch, productId]);

	const handleAddCart = () => {
		props.history.push(`/cart/${productId}?qty=${qty}`);
	};
	return (
		<div className="container">
			{loading ? (
				<LoadingBox />
			) : error ? (
				<MessageBox variant={"danger"}>{error}</MessageBox>
			) : (
				<div>
					<Link className="return-home" to="/">
						Back to Home
					</Link>
					<div className="product">
						<div className="product__image-container">
							<img
								className="product__image"
								// src={`https://omobolaji-ecomm-bucket.s3.eu-west-2.amazonaws.com/${product.image}`}
								src={`${product.image}`}
								alt={product.name}
							/>
						</div>
						<div className="product__description">
							<h2 className="product-description__title">
								{product.name}
							</h2>
							<Rating
								rating={product.rating}
								numReviews={product.numReviews}
							/>
							<p>Price: ₦ {product.price}</p>
							<p>Description: {product.description} </p>
						</div>
						<div className="product__checkout">
							<div className="product__checkout__flex">
								<div>Price</div>
								<div>₦ {product.price}</div>
							</div>
							<div className="product__checkout__flex">
								<div>Status</div>
								<div>
									{product.countInStock > 0 ? (
										<span className="success">
											In Stock
										</span>
									) : (
										<span className="failed">
											{" "}
											Unavailable
										</span>
									)}
								</div>
							</div>
							{product.countInStock > 0 && (
								<div className="product__checkout__flex">
									<div>Qty</div>
									<select
										className="select-qty"
										value={qty}
										onChange={(e) => setQty(e.target.value)}
									>
										{[
											...Array(
												product.countInStock
											).keys(),
										].map((key) => (
											<option
												key={key + 1}
												value={key + 1}
											>
												{" "}
												{key + 1}{" "}
											</option>
										))}
									</select>
								</div>
							)}
							{product.countInStock > 0 && (
								<button
									className="button button--primary button--block"
									onClick={handleAddCart}
								>
									Add to cart{" "}
								</button>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Products;
