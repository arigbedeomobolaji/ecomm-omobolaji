import mongoose from "mongoose"
import orderSchema from "../schema/orderSchema.js"

const Order = mongoose.model("order", orderSchema)

export default Order