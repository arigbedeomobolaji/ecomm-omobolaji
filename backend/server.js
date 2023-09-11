// configure the environment variables
import dotenv from "dotenv";
dotenv.config();
import path from "path";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./router/userRouter.js";
import productRouter from "./router/productRouter.js";
import orderRouter from "./router/orderRouter.js";
import uploadRouter from "./router/uploadRouter.js";
import keys from "./config/keys.js";

const app = express();
const port = process.env.PORT || keys.PORT;
const dbURL = keys.MONGO_URI;
// app setting middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("public"));

const startServer = async () => {
	try {
		await mongoose.connect(dbURL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("connected to DB  ✔️");
		app.listen(port, () => console.log(`Server running on port ${port}`));
	} catch (error) {
		console.log("Failed to connect to the DB ❌");
		console.log(error);
	}
};

startServer();

app.get("/api", (req, res) => {
	res.send({ message: "Welcome Let's code" });
});

app.get("/api/config/paystack", (req, res) => {
	res.send(keys.PAYSTACK_CLIENTID || "paystack_test");
});

// web app backend router handlers
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/upload", uploadRouter);

// client data
// if (process.env.NODE_ENV === "production") {
// 	// set static folder
// 	app.use(express.static("client/build"));
// 	app.get("*", (req, res) => {
// 		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
// 	});
// }

if (process.env.NODE_ENV === "production") {
	app.use("/", express.static("../client/build"));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
	});
}

// error handling middleware
app.use((err, req, res, next) => {
	res.status(500).send({ message: err.message });
});

export default app;
