// jshint ignore:start
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userSigninAction } from "../../actions/userSigninAction";
import MessageBox from "../../components/messagebox/MessageBox";

const Signin = (props) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo, loading, error } = userSignin;

	const redirect = props.location.search
		? props.location.search.split("=")[1]
		: "/";

	const dispatch = useDispatch();
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(userSigninAction(email, password));
	};

	useEffect(() => {
		if (userInfo) {
			props.history.push(redirect);
		}
	}, [userInfo, props.history, redirect]);
	return (
		<form className="form container" onSubmit={submitHandler}>
			<div className="form__group">
				<h1>Sign in</h1>
			</div>
			{!!error && (
				<div className="form__group">
					<MessageBox variant={"danger"}> {error} </MessageBox>
				</div>
			)}
			<div className="form__group">
				<label className="form__label" htmlFor="email">
					Email
				</label>
				<input
					type="email"
					id="email"
					className="form__input"
					placeholder="Enter Email Address"
					required
					onChange={(e) => setEmail(e.target.value)}
				></input>
			</div>
			<div className="form__group">
				<label className="form__label" htmlFor="password">
					Password
				</label>
				<input
					type="password"
					id="password"
					className="form__input"
					placeholder="Enter password Address"
					required
					onChange={(e) => setPassword(e.target.value)}
				></input>
			</div>
			<div className="form__group">
				<label className="form__label" />
				<button
					className="button button--primary"
					type="submit"
					disabled={loading}
				>
					{loading ? <span>Loading...</span> : <span>Sign in</span>}
				</button>
			</div>
			<div className="form__group">
				<span>
					New customer?{" "}
					<Link to={`/register?redirect=${redirect}`}>
						Register Here
					</Link>
				</span>
			</div>
		</form>
	);
};

export default Signin;
