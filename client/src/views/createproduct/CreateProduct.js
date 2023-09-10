// jshint ignore: start
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProductAction } from '../../actions/productListAction';
import InputText from '../../components/InputText';
import { Select, TextArea } from '../../components/Form';
import MessageBox from '../../components/messagebox/MessageBox';

const CreateProduct = (props) => {
	const ratingData = [0, 1, 2, 3, 4, 5];
	const categoryData = [
		'shoes',
		'pant',
		'shorts',
		'beauty',
		'electronic',
		'digital',
	];
	const [name, setName] = useState('');
	const [price, setPrice] = useState('');
	const [brand, setBrand] = useState('');
	const [category, setCategory] = useState('pant');
	const [rating, setRating] = useState(0);
	const [numReviews, setNumReviews] = useState(0);
	const [countInStock, setCountInStock] = useState(0);
	const [description, setDescription] = useState('');
	const [file, setFile] = useState(null);
	const dispatch = useDispatch();

	// interacting with store
	const createdProduct = useSelector((state) => state.createdProduct);
	const { loading, error, product } = createdProduct;

	const canContinue =
		name &&
		price &&
		file &&
		brand &&
		category &&
		rating >= 0 &&
		numReviews >= 0 &&
		countInStock >= 0 &&
		description;

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
		dispatch(createProductAction(data, file));
	};

	useEffect(() => {
		if (product) {
			props.history.push('/productlist');
		}
	}, [product, props.history]);

	return (
		<form className='form' onSubmit={submitHandler}>
			<div className='form__group'>
				<h1>Create Product</h1>
			</div>
			{!!error && <MessageBox variant='danger'>{error}</MessageBox>}
			<InputText
				isRequired
				name={'name'}
				label={'Name'}
				placeholder={'Enter Product Name'}
				onChange={(e) => {
					setName(e.target.value);
				}}
			/>
			<InputText
				isRequired={true}
				type='number'
				name='price'
				label='Price'
				placeholder='Enter Product Price'
				onChange={(e) => setPrice(e.target.value)}
			/>
			<InputText
				isRequired={true}
				type='file'
				name='image'
				label='Product Image'
				accept='image/*'
				onChange={(e) => setFile(e.target.files[0])}
			/>
			<InputText
				name='brand'
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
				type='number'
				name='numReviews'
				label='Number of Reviews'
				placeholder='Enter number of reviews'
				onChange={(e) => setNumReviews(e.target.value)}
			/>
			<InputText
				type='number'
				name='countInStock'
				label='Number of Product in Stock'
				placeholder='Enter number of Product in Stock'
				onChange={(e) => setCountInStock(e.target.value)}
			/>
			<TextArea
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
					disabled={!canContinue || loading}
				>
					{loading ? 'Creating' : 'Create Product'}
				</button>
			</div>
		</form>
	);
};

export default CreateProduct;
