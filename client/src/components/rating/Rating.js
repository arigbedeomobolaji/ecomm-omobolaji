// jshint ignore:start
import React from "react"
import "./rating.css"


const Rating = ({ rating, numReviews }) => {
 const renderStar = (n) => {
  return (
   rating >= n ? <i className="fas fa-star"></i> :
    rating >= (n - 0.5) ? <i className="fas fa-star-half-alt"></i> : <i className="far fa-star"></i>
  )
 }
 return (
  <div className="rating">
   <span> {renderStar(1)} </span>
   <span> {renderStar(2)} </span>
   <span> {renderStar(3)} </span>
   <span> {renderStar(4)} </span>
   <span> {renderStar(5)} </span>
   <span className="numReview"> { numReviews } reviews</span>
  </div>
 )
}

export default Rating
