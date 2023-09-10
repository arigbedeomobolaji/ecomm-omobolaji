import axios from "axios"
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, SHIPPING_ADDRESS, CART_EMPTY } from "../constants/cartConstants"

export const addToCartAction = (productId, qty) => {
 return async (dispatch, getState) => {
  const {data} = await axios.get(`/api/products/${productId}`)
  dispatch({
   type: CART_ADD_ITEM,
   payload: {
    name: data.name,
    image: data.image,
    price: data.price,
    countInStock: data.countInStock,
    product: data._id,
    qty
   }
  })
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
 }
}

export const removeFromCartAction = (productId) => {
 return (dispatch, getState) => {
  dispatch({type: CART_REMOVE_ITEM, payload: productId})
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
 }
}

export const shippingAddressAction = (data) => {
 return (dispatch) => {
  dispatch({type: SHIPPING_ADDRESS, payload: data})
  localStorage.setItem("shippingAddress", JSON.stringify(data))
 }
}

export const saveCartPaymentMethod = (data) => {
 return (dispatch) => {
  dispatch({type: CART_SAVE_PAYMENT_METHOD, payload: data})
 }
}

export const emptyCart = () => {
  return async(dispatch, getState) => {
    dispatch({type: CART_EMPTY})
    localStorage.removeItem(getState().cart.cartItems)
  }
}