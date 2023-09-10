import axios from 'axios';
import {
	CREATE_PRODUCT_REQUEST,
	CREATE_PRODUCT_SUCCESS,
	CREATE_PRODUCT_FAIL,
	PRODUCT_DETAIL_FAIL,
	PRODUCT_DETAIL_REQUEST,
	PRODUCT_DETAIL_SUCCESS,
	PRODUCT_LIST_FAIL,
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	EDIT_PRODUCT_REQUEST,
	EDIT_PRODUCT_SUCCESS,
	EDIT_PRODUCT_FAIL,
} from '../constants/productConstant';

export const productListAction = () => {
	return async (dispatch) => {
		dispatch({ type: PRODUCT_LIST_REQUEST });
		try {
			const { data } = await axios.get('/api/products');
			if (data) dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
		} catch (error) {
			dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
		}
	};
};

export const productDetailsAction = (productId) => {
	return async (dispatch) => {
		dispatch({ type: PRODUCT_DETAIL_REQUEST, payload: productId });
		try {
			const { data } = await axios.get(`/api/products/${productId}`);
			if (data) dispatch({ type: PRODUCT_DETAIL_SUCCESS, payload: data });
		} catch (err) {
			dispatch({
				type: PRODUCT_DETAIL_FAIL,
				payload:
					err.response && err.response.data.message
						? err.response.data.message
						: err.message,
			});
		}
	};
};

export const createProductAction =
	(productData, file) => async (dispatch, getState) => {
		dispatch({ type: CREATE_PRODUCT_REQUEST });
		const {
			userSignin: { userInfo },
		} = getState();
		try {
			const { data: fileData } = await axios.get('/api/upload', {
				headers: {
					authorization: `Bearer ${userInfo.token}`,
				},
			});
			await axios.put(fileData.url, file, {
				headers: {
					'Content-Type': file.type,
				},
			});
			const { data } = await axios.post(
				'/api/products/create',
				{
					...productData,
					image: fileData.key,
				},
				{
					headers: {
						authorization: `Bearer ${userInfo.token}`,
					},
				}
			);
			if (data) {
				dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data });
			}
		} catch (err) {
			const message =
				err.response && err.response.data.message
					? err.response.data.message
					: err.message;
			dispatch({ type: CREATE_PRODUCT_FAIL, payload: message });
		}
	};

export const editProductAction =
	(productId, update, file, fileTwo) => async (dispatch, getState) => {
		dispatch({ type: EDIT_PRODUCT_REQUEST });
		const {
			userSignin: { userInfo },
		} = getState();
		let fileOneData;
		let fileTwoData;

		try {
			if (file) {
				const axiosFileOneData = await getPresignedUrl(userInfo.token);
				fileOneData = axiosFileOneData;
			}

			if (fileTwo) {
				const axiosFileTwoData = await getPresignedUrl(userInfo.token);
				fileTwoData = axiosFileTwoData;
			}

			if (fileOneData) {
				await uploadImageToAWS(fileOneData, file);
			}

			if (fileTwoData) {
				await uploadImageToAWS(fileTwoData, fileTwo);
			}

			const { data } = await axios.put(
				`/api/products/${productId}`,
				{
					...update,
					image: fileOneData && fileOneData.key,
					additionalImage: fileTwoData && fileTwoData.key,
				},
				{
					headers: {
						authorization: `Bearer ${userInfo.token}`,
					},
				}
			);
			console.log(data);
			if (data) {
				dispatch({ type: EDIT_PRODUCT_SUCCESS, payload: data });
			}
		} catch (err) {
			const message =
				err.response && err.response.data.message
					? err.response.data.message
					: err.message;
			dispatch({ type: EDIT_PRODUCT_FAIL, payload: message });
		}
	};

async function getPresignedUrl(token) {
	const { data } = await axios.get('/api/upload', {
		headers: {
			authorization: `Bearer ${token}`,
		},
	});
	return data;
}

async function uploadImageToAWS(data, file) {
	await axios.put(data.url, file, {
		headers: {
			'Content-Type': file.type,
		},
	});
}

// b76a1fa6-9690-4231-8582-b117eb58fc9d
