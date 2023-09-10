// jshint ignore:start
import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export default function AdminRoute({ component: Component, ...rest }) {
	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;
	return (
		<Route
			{...rest}
			component={(props) =>
				userInfo && userInfo.isAdmin ? (
					<Component {...props} />
				) : (
					<Redirect to='/' />
				)
			}
		/>
	);
}
