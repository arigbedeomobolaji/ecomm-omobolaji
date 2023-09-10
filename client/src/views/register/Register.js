import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { userRegisterAction } from '../../actions/userSigninAction';
import MessageBox from '../../components/messagebox/MessageBox';

const Register = (props) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [password, setPassword] = useState('');
	const [clientError, setClientError] = useState('');
	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo, loading, error } = userSignin;

	const redirect = props.location.search
		? props.location.search.split('=')[1]
		: '/';

	const dispatch = useDispatch();
	const submitHandler = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			return setClientError("Password & confirm password didn't match");
		}
		dispatch(userRegisterAction(name, email, password));
	};

	useEffect(() => {
		if (userInfo) {
			props.history.push(redirect);
		}
	}, [userInfo, props.history, redirect]);

	return (
		<form className='form' onSubmit={submitHandler}>
			<div className='form__group'>
				<h1>Register</h1>
			</div>
			{!!clientError ? (
				<div className='form__group'>
					<MessageBox variant={'danger'}> {clientError} </MessageBox>
				</div>
			) : (
				!!error && (
					<div className='form__group'>
						<MessageBox variant={'danger'}> {error} </MessageBox>
					</div>
				)
			)}
			<div className='form__group'>
				<label className='form__label' htmlFor='name'>
					Name
				</label>
				<input
					type='text'
					id='name'
					className='form__input'
					placeholder='Enter Email Address'
					required
					value={name}
					onChange={(e) => setName(e.target.value)}
				></input>
			</div>
			<div className='form__group'>
				<label className='form__label' htmlFor='email'>
					Email
				</label>
				<input
					type='email'
					id='email'
					className='form__input'
					placeholder='Enter Email Address'
					required
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				></input>
			</div>
			<div className='form__group'>
				<label className='form__label' htmlFor='password'>
					Password
				</label>
				<input
					type='password'
					id='password'
					className='form__input'
					placeholder='Enter password Address'
					required
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				></input>
			</div>
			<div className='form__group'>
				<label className='form__label' htmlFor='confirm-password'>
					Confirm Password
				</label>
				<input
					type='password'
					id='confirm-password'
					className='form__input'
					placeholder='Enter confirm password Address'
					required
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
				></input>
			</div>
			<div className='form__group'>
				<label className='form__label' />
				<button
					className='button button--primary'
					type='submit'
					disabled={loading}
				>
					{loading ? <span>Loading...</span> : <span>Register</span>}
				</button>
			</div>
			<div className='form__group'>
				<span>
					New customer?{' '}
					<Link to={`/signin?redirect=${redirect}`}>Sign in</Link>
				</span>
			</div>
		</form>
	);
};

export default Register;
