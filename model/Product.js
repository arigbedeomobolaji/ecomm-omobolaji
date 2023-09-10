import mongoose from "mongoose"
import productSchema from "../schema/productSchema.js"

const Product = mongoose.model("product", productSchema)

export default Product