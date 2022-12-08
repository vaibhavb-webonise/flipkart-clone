import React from 'react'
import DealSliderTitle from './DealSliderTitle';
import DealSliderCorousel from './DealSliderCorousel';

const DealSlider = () => {
    return (
        <div className="deal-slider">
            <div className="deal-slider-title">
                <DealSliderTitle />
            </div>

            {/* actual Slider */}
            <DealSliderCorousel />
        </div>
    )
}

export default DealSlider
