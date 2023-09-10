// jshint ignore: start
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	productDetailsAction,
	editProductAction,
} from '../../actions/productListAction';
import { EDIT_PRODUCT_RESET } from '../../constants/productConstant';
import InputText from '../../components/InputText';
import { Select, TextArea } from '../../components/Form';
import MessageBox from '../../components/messagebox/MessageBox';
import { updateData } from '../../util';

const EditProduct = (props) => {
	const productId = props.match.params.id;
	const productDetails = useSelector((state) => state.productDetails);
	const { product, error } = productDetails;

	const editedProduct = useSelector((state) => state.editedProduct);
	let {
		loading,
		product: updatedProduct,
		error: editedProductError,
	} = editedProduct;
	console.log({ loading, updatedProduct, editedProductError });

	const ratingData = [0, 1, 2, 3, 4, 5];
	const categoryData = [
		'shoes',
		'pant',
		'shorts',
		'beauty',
		'electronic',
		'digital',
	];
	const [name, setName] = useState(product ? product.name : '');
	const [price, setPrice] = useState(product ? product.price : 0);
	const [image, setImage] = useState(product ? product.image : '');
	const [brand, setBrand] = useState(product ? product.brand : '');
	const [category, setCategory] = useState(product ? product.category : '');
	const [rating, setRating] = useState(product ? product.rating : 0);
	const [numReviews, setNumReviews] = useState(
		product ? product.numReviews : 0
	);
	const [countInStock, setCountInStock] = useState(
		product ? product.countInStock : 0
	);
	const [description, setDescription] = useState(
		product ? product.description : ''
	);
	const [file, setFile] = useState(null);
	const [fileTwo, setFileTwo] = useState(null);
	const dispatch = useDispatch();
	const submitHandler = (e) => {
		e.preventDefault();
		const data = {
			name,
			price: Number(price),
			brand,
			category,
			rating: Number(rating),
			numReviews: Number(numReviews),
			countInStock: Number(countInStock),
			description,
		};
		const update = updateData(product, data);
		dispatch(editProductAction(productId, update, file, fileTwo));
	};

	useEffect(() => {
		dispatch(productDetailsAction(productId));
	}, [dispatch, productId]);

	useEffect(() => {
		if (updatedProduct) {
			props.history.push('/productlist');
		}
		dispatch({ type: EDIT_PRODUCT_RESET });
	}, [updatedProduct, props.history, dispatch]);

	return (
		<form className='form' onSubmit={submitHandler}>
			<div className='form__group'>
				<h1>Edit Product</h1>
			</div>
			{!!error && <MessageBox variant='danger'>{error}</MessageBox>}
			<InputText
				isRequired
				name={'name'}
				value={name}
				label={'Name'}
				placeholder={'Enter Product Name'}
				onChange={(e) => {
					setName(e.target.value);
				}}
			/>
			<InputText
				isRequired
				value={price}
				type='number'
				name='price'
				label='Price'
				placeholder='Enter Product Price'
				onChange={(e) => setPrice(e.target.value)}
			/>
			<InputText
				isRequired
				value={image}
				type='text'
				name='image'
				label='Image Url'
				placeholder='Enter Image URL'
				onChange={(e) => setImage(e.target.value)}
			/>
			<InputText
				type='file'
				name='image'
				label='Add Product Image'
				accept='image/*'
				onChange={(e) => setFile(e.target.files[0])}
			/>
			<InputText
				type='file'
				name='additionalImage'
				label='Additional Image'
				accept='image/*'
				onChange={(e) => setFileTwo(e.target.files[0])}
			/>
			<InputText
				name='brand'
				value={brand}
				label='Brand'
				placeholder='Enter Product Brand'
				onChange={(e) => setBrand(e.target.value)}
			/>
			<div className='form__group--row space-evenly'>
				<Select
					value={category}
					onChange={(e) => setCategory(e.target.value)}
					label='Category'
					name='category'
					data={categoryData}
				></Select>
				<Select
					value={rating}
					onChange={(e) => setRating(e.target.value)}
					label='Rating'
					name='rating'
					data={ratingData}
				></Select>
			</div>
			<InputText
				value={numReviews}
				type='number'
				name='numReviews'
				label='Number of Reviews'
				placeholder='Enter number of reviews'
				onChange={(e) => setNumReviews(e.target.value)}
			/>
			<InputText
				value={countInStock}
				type='number'
				name='countInStock'
				label='Number of Product in Stock'
				placeholder='Enter number of Product in Stock'
				onChange={(e) => setCountInStock(e.target.value)}
			/>
			<TextArea
				value={description}
				name='description'
				label='Description'
				placeholder='Enter Product Description'
				onChange={(e) => setDescription(e.target.value)}
			/>
			<div className='form__group'>
				<label className='form__label' />
				<button
					type='submit'
					className='button button--primary'
					disabled={loading}
				>
					{loading ? 'Updating' : 'Edit Product'}
				</button>
			</div>
		</form>
	);
};

export default EditProduct;
