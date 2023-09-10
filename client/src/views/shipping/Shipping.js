import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { shippingAddressAction } from '../../actions/cartActions';
import MessageBox from '../../components/messagebox/MessageBox';
import ProgressBar from '../../components/progressbar/ProgressBar';

const Shipping = (props) => {
	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo, loading, error } = userSignin;
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;
	const [fullname, setFullname] = useState(shippingAddress.fullname || '');
	const [address, setAddress] = useState(shippingAddress.address || '');
	const [city, setCity] = useState(shippingAddress.city || '');
	const [postalCode, setPostalCode] = useState(
		shippingAddress.postalCode || ''
	);
	const [country, setCountry] = useState(shippingAddress.country || '');

	if (!userInfo) {
		props.history.push('/signin?redirect=shipping');
	}

	const dispatch = useDispatch();
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			shippingAddressAction({
				fullname,
				address,
				city,
				postalCode,
				country,
			})
		);
		props.history.push('/payment');
	};

	return (
		<div>
			<ProgressBar signin shipping />
			<form className='form' onSubmit={submitHandler}>
				<div className='form__group'>
					<h1>Shipping</h1>
				</div>
				{!!error && (
					<div className='form__group'>
						<MessageBox variant={'danger'}> {error} </MessageBox>
					</div>
				)}
				<div className='form__group'>
					<label className='form__label' htmlFor='fullname'>
						Full Name
					</label>
					<input
						type='text'
						id='fullname'
						className='form__input'
						placeholder='Enter your Full Name'
						required
						value={fullname}
						onChange={(e) => setFullname(e.target.value)}
					></input>
				</div>
				<div className='form__group'>
					<label className='form__label' htmlFor='address'>
						Address
					</label>
					<input
						type='text'
						id='address'
						className='form__input'
						placeholder='Enter Address'
						required
						value={address}
						onChange={(e) => setAddress(e.target.value)}
					></input>
				</div>
				<div className='form__group'>
					<label className='form__label' htmlFor='city'>
						City
					</label>
					<input
						type='text'
						id='city'
						className='form__input'
						placeholder='Enter city'
						required
						value={city}
						onChange={(e) => setCity(e.target.value)}
					></input>
				</div>
				<div className='form__group'>
					<label className='form__label' htmlFor='postalCode'>
						Postal Code
					</label>
					<input
						type='text'
						id='postalCode'
						className='form__input'
						placeholder='Enter Postal Code'
						required
						value={postalCode}
						onChange={(e) => setPostalCode(e.target.value)}
					></input>
				</div>
				<div className='form__group'>
					<label className='form__label' htmlFor='country'>
						Country
					</label>
					<input
						type='text'
						id='country'
						className='form__input'
						placeholder='Enter Country'
						required
						value={country}
						onChange={(e) => setCountry(e.target.value)}
					></input>
				</div>
				<div className='form__group'>
					<label className='form__label' />
					<button
						className='button button--primary'
						type='submit'
						disabled={loading}
					>
						{loading ? (
							<span>Loading...</span>
						) : (
							<span>Continue</span>
						)}
					</button>
				</div>
			</form>
		</div>
	);
};

export default Shipping;
