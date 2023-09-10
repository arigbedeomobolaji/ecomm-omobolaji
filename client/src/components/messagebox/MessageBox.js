// jshint ignore:start
import React from "react"
import "./message.css"

const MessageBox = (props) => {
 return (
  <div className={`alert alert--${props.variant}`}>
   {props.children}
  </div>
 )
}
export default MessageBox