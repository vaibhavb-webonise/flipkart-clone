import React, { useState } from 'react'
import { useEffect } from 'react';
import { getTimeLeft } from '../helpers/functions';

const DealSliderTitle = () => {
    const [timeLeft, setTimeLeft] = useState('');
    const timerUrl = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/timer_a73398.svg';

    useEffect(() => {
        const leftTimeInterval = setInterval(() => {
            setTimeLeft(getTimeLeft())
        }, 1000)

        return () => {
            clearInterval(leftTimeInterval);
        }
    }, [])

    return (
        <>
            {/* title and timer */}
            <div className="title-and-timer">
                <div className="title"> Deals of the Day</div>
                <div className="timer">
                    <img src={timerUrl} alt='timer' className="timer-icon" />
                    <span className="time-left">{timeLeft} Left</span>
                </div>
            </div>
            <button className="blue-button view-All-Button">View All</button>
        </>
    )
}

export default DealSliderTitle
