// jshint ignore:start
import {
	PRODUCT_DETAIL_FAIL,
	PRODUCT_DETAIL_REQUEST,
	PRODUCT_DETAIL_SUCCESS,
	PRODUCT_LIST_FAIL,
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	CREATE_PRODUCT_REQUEST,
	CREATE_PRODUCT_SUCCESS,
	CREATE_PRODUCT_FAIL,
	EDIT_PRODUCT_REQUEST,
	EDIT_PRODUCT_SUCCESS,
	EDIT_PRODUCT_FAIL,
	EDIT_PRODUCT_RESET,
} from '../constants/productConstant';

const productListDefault = { products: [], loading: false, error: false };
export const productListReducer = (state = productListDefault, action) => {
	switch (action.type) {
		case PRODUCT_LIST_REQUEST:
			return { loading: true };
		case PRODUCT_LIST_SUCCESS:
			return { loading: false, products: action.payload };
		case PRODUCT_LIST_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

const productDetailDefault = { product: null, error: false, loading: true };
export const productDetailReducer = (state = productDetailDefault, action) => {
	switch (action.type) {
		case PRODUCT_DETAIL_REQUEST:
			return { loading: true, productId: action.payload };
		case PRODUCT_DETAIL_SUCCESS:
			return { loading: false, product: action.payload };
		case PRODUCT_DETAIL_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

const createProductDefault = { product: null, loading: false, error: '' };
export const createProductReducer = (state = createProductDefault, action) => {
	switch (action.type) {
		case CREATE_PRODUCT_REQUEST:
			return { loading: true };
		case CREATE_PRODUCT_SUCCESS:
			return {
				loading: false,
				product: action.payload,
			};
		case CREATE_PRODUCT_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

const editProductDefault = { product: null, loading: false, error: '' };
export const editProductReducer = (state = editProductDefault, action) => {
	switch (action.type) {
		case EDIT_PRODUCT_REQUEST:
			return { loading: true };
		case EDIT_PRODUCT_SUCCESS:
			return {
				loading: false,
				product: action.payload,
			};
		case EDIT_PRODUCT_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		case EDIT_PRODUCT_RESET:
			return editProductDefault;
		default:
			return state;
	}
};
