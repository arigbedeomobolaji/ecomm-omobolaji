import axios from "axios"
import { CART_EMPTY } from "../constants/cartConstants"
import { 
  ORDER_CREATE_FAIL, 
  ORDER_CREATE_REQUEST, 
  ORDER_CREATE_SUCCESS, 
  ORDER_DETAILS_FAIL, 
  ORDER_DETAILS_REQUEST, 
  ORDER_DETAILS_SUCCESS, 
  ORDER_PAY_SUCCESS,
  ORDER_PAY_REQUEST,
  ORDER_PAY_FAIL, 
  ORDER_MINE_LIST_REQUEST,
  ORDER_MINE_LIST_FAIL,
  ORDER_MINE_LIST_SUCCESS
} from "../constants/orderConstants"

export const createOrder = (order) => {
  return async (dispatch, getState) => {
    dispatch({type: ORDER_CREATE_REQUEST, payload: order})
    try {
      const userSignin = getState().userSignin
      const {userInfo} = userSignin
      const {data} = await axios.post("/api/orders/create", order, {
        headers: {
          authorization: `Bearer ${userInfo.token}`
        }
      })
      dispatch({type: ORDER_CREATE_SUCCESS, payload: data.createdOrder})
      dispatch({type: CART_EMPTY})
      localStorage.removeItem("cartItems")

    }catch(e){
      dispatch({type: ORDER_CREATE_FAIL, payload: e.response && e.response.data.error ? e.response.data.error : e.message})
    }
 }
}

export const orderDetailsAction = (orderId) => {
  return async (dispatch, getState) => {
    dispatch({type: ORDER_DETAILS_REQUEST, payload: orderId})
    try{
      const {userSignin: {userInfo}} = getState()
      const {data} = await axios.get(`/api/orders/${orderId}`, {
        headers: {
          "authorization": `Bearer ${userInfo.token}`
        }
      })
      dispatch({type: ORDER_DETAILS_SUCCESS, payload: data.order})

    }catch(err){
      const message = err.response && err.response.data.error ? err.response.data.error : err.message
      dispatch({type: ORDER_DETAILS_FAIL, payload: message})
    }
  }
}

export const orderPayAction = (order, reference) => {
  return async (dispatch, getState) => {
    const {userSignin: {userInfo}} = getState()
    dispatch({type: ORDER_PAY_REQUEST})
    try{
      const {data} = await axios.put(`/api/orders/${order._id}/pay`, reference, {
        headers: {
          "authorization": `Bearer ${userInfo.token}`
        }
      })
      
      if(typeof(data) === "object"){
        dispatch({type: ORDER_PAY_SUCCESS, payload: data.updatedOrder})
      }

    }catch(err){
      const message = err.response && err.response.data.error ? err.response.data.error : err.message
      dispatch({type: ORDER_PAY_FAIL, payload: message})

    }
  }
}


export const listOrderMine = () => {
  return async (dispatch, getState) => {
    dispatch({type: ORDER_MINE_LIST_REQUEST});
    const {userSignin : { userInfo }} = getState();
    try{
      const { data } = await axios.get('/api/orders/mine', {
        headers: {
          'authorization': `Bearer ${userInfo.token}`
        }
      });

      dispatch({type: ORDER_MINE_LIST_SUCCESS, payload: data});
    }catch(err){
      const message = err.reponse && err.response.data.error ? err.response.data.error : err.message;
      dispatch({type: ORDER_MINE_LIST_FAIL, payload: message});
    }
  }
}