import express from "express";
import asyncHandler from "express-async-handler";
import Product from "../model/Product.js";
import data from "../data.js";
import { isAdmin, verifyAuthToken } from "../utils.js";
const productRouter = express.Router();

productRouter.get(
	"/seed",
	asyncHandler(async (req, res) => {
		const createdProducts = await Product.insertMany(data.products);

		if (createdProducts) {
			return res.send({ createdProducts });
		}

		res.status(404).send({ message: "No products" });
	})
);

productRouter.get(
	"/",
	asyncHandler(async (req, res) => {
		const products = await Product.find({});
		if (products) {
			return res.send(products);
		}
		res.status(404).send({ message: "No product found" });
	})
);

productRouter.post(
	"/create",
	verifyAuthToken,
	isAdmin,
	asyncHandler(async (req, res) => {
		const product = new Product(req.body);
		const savedProduct = await product.save();

		if (savedProduct) {
			return res.send(savedProduct);
		}

		res.status(401).send({ message: "Unable to save product" });
	})
);

productRouter.delete(
	"/:id",
	verifyAuthToken,
	isAdmin,
	asyncHandler(async (req, res) => {
		const id = req.params.id;
		const deletedProduct = await Product.findByIdAndDelete(id);
		if (deletedProduct) {
			return res.status(200).send(deletedProduct);
		}
		res.send({ message: "Unable to delete this product" });
	})
);

productRouter.put(
	"/:id",
	verifyAuthToken,
	isAdmin,
	asyncHandler(async (req, res) => {
		const id = req.params.id;
		const update = req.body;
		const updatedProduct = await Product.findByIdAndUpdate(id, update, {
			new: true,
		});
		if (updatedProduct) {
			return res.status(201).send(updatedProduct);
		}

		res.status(422).send({ message: "Unable to update product." });
	})
);

productRouter.get(
	"/:id",
	asyncHandler(async (req, res) => {
		const product = await Product.findById(req.params.id);
		if (product) {
			return res.send(product);
		}
		res.status(404).send({
			message: `product with id ${req.params.id} not found.`,
		});
	})
);

export default productRouter;
