import React from "react"
import "./progressbar.css"

const ProgressBar = (props) => {
 return (
  <div className="progress-bar">
   <div 
    className={props.signin ? "active": ""}
   >
    Signin
   </div
   >
   <div
    className={props.shipping ? "active": ""}
    >
    Shipping
   </div>
   <div
    className={props.payment ? "active": ""}>
    Payment
   </div>
   <div
    className={props.placeOrder ? "active": ""}>
    Place Order
   </div>
  </div>
 )
}

export default ProgressBar