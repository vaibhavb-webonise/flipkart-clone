import './dealComponent.css'
import React from 'react'

const DealComponent = ({ deal = {} }) => {
  function truncate(str, n = 20) {
    return (str.length > n) ? str.substr(0, n - 1) + '...' : str;
  };
  return (
    <div className="deal">
      {/* image of the item  */}
      <div className="image-container">
        <img src={deal.url} alt="deal" />
      </div>

      {/* deal title */}
      <div className="deal-title">
        {truncate(deal.title)}
      </div>

      {/* deal offer  */}
      <div className="deal-offer">
        {truncate(deal.offer,17)}
      </div>

      {/* deal description */}
      <div className="deal-description">
        {deal.description}
      </div>
    </div>
  )
}

export default DealComponent
