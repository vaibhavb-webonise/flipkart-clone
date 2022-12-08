import React from 'react'
import './dealOfTheDay.css'
import DealSlider from './DealSlider';
import RefurbishMobiles from './RefurbishMobiles';
const DealOfTheDay = () => {
    return (
        <div className="deal-of-the-day">
            <div className="deal-container">
                <div className="deal-wrapper">
                    {/* first slider for the deal */}
                    <DealSlider />
                    {/* right side mobile */}
                    <RefurbishMobiles />
                </div>
            </div>
        </div>
    )
}

export default DealOfTheDay
