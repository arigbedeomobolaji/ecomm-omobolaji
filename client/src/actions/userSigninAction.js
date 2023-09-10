import axios from "axios"
import { USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS } from "../constants/userConstants"

// REGISTER ACTION
export const userRegisterAction = (name, email, password) => {
 return async (dispatch) => {
  dispatch({type: USER_REGISTER_REQUEST})
  try {
   const { data } = await axios.post("/api/users/register", {
    name, email, password
   })
   if (data) {
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data })
    localStorage.setItem("userInfo", JSON.stringify(data))
   }
  } catch (error) {
   dispatch({
    type: USER_REGISTER_FAIL,
    payload: error.response && error.response.data.message ? error.response.data.message : error.message 
   })
  }
 }
}

// SIGNIN ACTION
export const userSigninAction = (email, password) => {
 return async (dispatch) => {
  dispatch({type: USER_SIGNIN_REQUEST})
  try {
   const { data } = await axios.post("/api/users/signin", {
    email, password
   })
   if (data) {
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data })
    localStorage.setItem("userInfo", JSON.stringify(data))
   }
  } catch (error) {
   dispatch({
    type: USER_SIGNIN_FAIL,
    payload: error.response && error.response.data.message ? error.response.data.message : error.message 
   })
  }
 }
}

export const userSignoutAction = () => {
 return (dispatch) => {
  localStorage.removeItem("cartItems")
  localStorage.removeItem("userInfo")
  localStorage.removeItem("shippingAddress")
  dispatch({type: USER_SIGNOUT})
 }
}

export const userDetailsAction = userId => async (dispatch, getState) => {
  dispatch({type: USER_DETAILS_REQUEST, payload: userId});
  const {userSignin: {userInfo}} = getState();
  try{
    const {data} = await axios.get(`/api/users/${userId}`, {
      headers: {
        'authorization': `Bearer ${userInfo._id}`
      }
    });
    dispatch({type: USER_DETAILS_SUCCESS, payload: data});
  }catch(error){
    const message = error.response && error.response.data.error ? error.response.data.error : error.message;
    dispatch({type: USER_DETAILS_FAIL, payload: message});
  }
} 

export const updateUserProfileAction = (user) => async (dispatch, getState) => {
  dispatch({type: USER_UPDATE_PROFILE_REQUEST});
  const {userSignin: {userInfo}} = getState();
  try{
    const {data} = await axios.put('/api/users/profile', user, {
      headers: {
        authorization: `Bearer ${userInfo.token}`
      }
    });
    dispatch({type: USER_UPDATE_PROFILE_SUCCESS});
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data })
    localStorage.setItem("userInfo", JSON.stringify(data))
  }catch(error){
    const message = error.response && error.response.data.error ? error.response.data.error : error.message;
    dispatch({type: USER_UPDATE_PROFILE_FAIL, payload: message})
  }
}