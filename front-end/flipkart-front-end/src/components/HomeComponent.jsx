import React from 'react'
import Header from '../Header';
import CatergoryNav from './CatergoryNav';
import Slider from './Slider';
import DealOfTheDay from './DealOfTheDay';
import OtherDealComponent from './OtherDealComponent';
import FooterScreen from '../screens/FooterScreen';

const HomeComponent = () => {
    return (
        <>
            <Header />
            <CatergoryNav />
            <Slider />
            <DealOfTheDay />
            <OtherDealComponent />
            <FooterScreen />
        </>
    )
}

export default HomeComponent
