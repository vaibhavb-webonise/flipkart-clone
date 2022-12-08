import React from 'react'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
const CarouselButtons = ({ handleSlideChange, usedFor }) => {
    return (
        <div>
            <button className="carousel-control left" onClick={() => handleSlideChange('left')}><ChevronLeftIcon fontSize="large" /></button>
            <button className={`carousel-control ${usedFor === 'deal' ? 'deal-right' : 'right'}`} onClick={handleSlideChange}><ChevronRightIcon fontSize="large" /></button>
        </div>
    )
}

export default CarouselButtons
