// jshint ignore: start
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./home.css";
import Product from "../../components/product/Product";
import { productListAction } from "../../actions/productListAction";
import LoadingBox from "../../components/loadingbox/LoadingBox";
import MessageBox from "../../components/messagebox/MessageBox";

const Home = () => {
	const dispatch = useDispatch();
	const listProduct = useSelector((state) => state.productList);
	const { loading, products, error } = listProduct;
	useEffect(() => {
		dispatch(productListAction());
	}, [dispatch]);

	return (
		<div className="container">
			{loading ? (
				<LoadingBox />
			) : error ? (
				<MessageBox variant={"danger"}>{error}</MessageBox>
			) : (
				<div className="cards cards--flex-start">
					{products.map((product) => (
						<Product key={product._id} product={product} />
					))}
				</div>
			)}
		</div>
	);
};
export { Home as default };
