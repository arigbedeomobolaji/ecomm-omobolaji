// jshint ignore: start
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { userSignoutAction } from '../../actions/userSigninAction';
import './header.css';

const Header = () => {
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;
	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;

	const handleSignout = () => {
		dispatch(userSignoutAction());
	};

	return (
		<div className='header'>
			<div>
				<Link to='/' className='header__brand'>
					Ecomm
				</Link>
			</div>
			<div className='header__side-right'>
				<div>
					<Link
						to='/cart'
						className='header__link header__link--cart'
					>
						<i className='fas fa-cart-arrow-down fa-2x cart-icon'></i>
						{cartItems.length > 0 && (
							<span className='badge'>
								{' '}
								{cartItems.length > 0 && cartItems.length}
							</span>
						)}
					</Link>
				</div>

				{!!userInfo ? (
					<div className='dropdown'>
						<Link to='#' className='header__link'>
							{userInfo.email.split('@')[0]}
							<i className='fas fa-chevron-down'></i>
						</Link>
						<div className='dropdown__body'>
							<Link className='header__link' to='/orderhistory'>
								Order history
							</Link>
							<Link className='header__link' to='/profile'>
								User Profile
							</Link>
							<Link
								className='header__link'
								to=''
								onClick={handleSignout}
							>
								Sign out
							</Link>
						</div>
					</div>
				) : (
					<div>
						<Link to='/signin' className='header__link'>
							Sign in
						</Link>
					</div>
				)}

				{!!userInfo && userInfo.isAdmin && (
					<div className='dropdown'>
						<Link to='#' className='header__link'>
							Admin <i className='fas fa-chevron-down'></i>
						</Link>
						<div className='dropdown__body'>
							<Link className='header__link' to='/dashboard'>
								Dashboard
							</Link>
							<Link className='header__link' to='/productlist'>
								Products
							</Link>
							<Link className='header__link' to='/orderlist'>
								Orders
							</Link>
							<Link className='header__link' to='/userlist'>
								Users
							</Link>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Header;
