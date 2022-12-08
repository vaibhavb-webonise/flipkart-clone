import React from 'react'
import { useUserValue } from '../helpers/ContextInfo';
import './otherDeals.css'
const OtherDealComponent = () => {
    const [state] = useUserValue();
    const offerUrl = state?.offerUrl
    return (
        <div className="otherDeals">
            <div className="card-wrapper">
                {
                    offerUrl?.map((res, index) => (
                        <div key={index} className={`deal-card ${index === offerUrl.length - 1 ? 'right-card' : ''}`}>
                            <img src={res} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default OtherDealComponent
