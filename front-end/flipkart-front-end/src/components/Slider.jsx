import React, { useEffect, useState } from 'react'
import './slider.css'
import CarouselItem from './CarouselItem';
import CarouselButtons from './CarouselButtons';
import { useUserValue } from '../helpers/ContextInfo';



const Slider = () => {

    const [currentSlide, setCurrentSlide] = useState(0);
    const [state] = useUserValue();
    const urls = state?.adUrls ?? []

    useEffect(() => {
        const slideInterval = setInterval(() => {
            setCurrentSlide(currentSlide => currentSlide === urls.length - 1 ? 0 : currentSlide + 1);
        }, 3000)

        return () => {
            clearInterval(slideInterval)
        }
    }, [urls]);


    const handleSlideChange = (dir) => {
        if (dir === 'left') {
            setCurrentSlide(currentSlide => currentSlide === 0 ? urls.length - 1 : currentSlide - 1);
            return;
        }
        setCurrentSlide(currentSlide => currentSlide === urls.length - 1 ? 0 : currentSlide + 1)
    }
    return (
        <div className="container">
            <div className="carousel">
                <div className="carousel-inner" style={{ transform: `translateX(${-currentSlide * 100}%)` }}>
                    {
                        urls.map((slide, index) => (
                            <CarouselItem slide={slide} key={index} />
                        ))
                    }
                </div>
                <CarouselButtons handleSlideChange={handleSlideChange} />
            </div>
        </div>
    )
}

export default Slider
