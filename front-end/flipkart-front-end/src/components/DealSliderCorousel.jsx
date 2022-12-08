import React from 'react'
import './dealCorousel.css'
import Carousel from 'react-elastic-carousel';
import DealComponent from './DealComponent';
import { dummyOffers } from '../helpers/DummyUrls';

const DealSliderCorousel = () => {
    const items = dummyOffers
    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 500, itemsToShow: Math.floor(items.length / 4) },
        { width: 768, itemsToShow: Math.ceil(items.length / 2) },
        { width: 1200, itemsToShow: items.length },
    ]

    return (
        <div className="deal-slider-container">
            <div className="deal-slider-wrapper">
                <Carousel
                    className="actual-slider"
                    breakPoints={breakPoints}
                >
                    {
                        items.map((deal, index) => <div className="slider-item" key={index}>
                            <DealComponent deal={deal} />
                        </div>
                        )
                    }
                </Carousel>
            </div>
        </div>
    )
}

export default DealSliderCorousel
