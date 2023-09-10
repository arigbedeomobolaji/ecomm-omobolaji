import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const productSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		image: {
			type: String,
			required: true,
		},
		additionalImage: {
			type: String,
		},
		category: {
			type: String,
			required: true,
		},
		brand: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		rating: {
			type: Number,
			required: true,
		},
		numReviews: {
			type: Number,
			required: true,
		},
		countInStock: {
			type: Number,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

export default productSchema;
