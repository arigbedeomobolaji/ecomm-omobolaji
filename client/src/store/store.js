// jshint ignore:start
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { addToCartReducer } from '../reducers/cartReducers';
import {
	orderDetailsReducer,
	orderPayReducer,
	orderReducer,
	orderMineListReducer,
} from '../reducers/orderReducers';
import {
	productDetailReducer,
	productListReducer,
	createProductReducer,
	editProductReducer,
} from '../reducers/productListReducer';
import {
	updateUserProfileReducer,
	userDetailsReducer,
	userSigninReducer,
} from '../reducers/userSigninReducer';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const initialState = {
	userSignin: {
		userInfo: localStorage.getItem('userInfo')
			? JSON.parse(localStorage.getItem('userInfo'))
			: null,
	},
	cart: {
		shippingAddress: localStorage.getItem('shippingAddress')
			? JSON.parse(localStorage.getItem('shippingAddress'))
			: {},
		cartItems: localStorage.getItem('cartItems')
			? JSON.parse(localStorage.getItem('cartItems'))
			: [],
		cartPaymentMethod: 'PayPal',
	},
};
const reducer = combineReducers({
	productList: productListReducer,
	productDetails: productDetailReducer,
	cart: addToCartReducer,
	userSignin: userSigninReducer,
	userDetails: userDetailsReducer,
	order: orderReducer,
	orderDetails: orderDetailsReducer,
	orderPay: orderPayReducer,
	orderMineList: orderMineListReducer,
	updateUserProfile: updateUserProfileReducer,
	createdProduct: createProductReducer,
	editedProduct: editProductReducer,
});
const store = createStore(
	reducer,
	initialState,
	composeEnhancer(applyMiddleware(thunk))
);

export default store;
