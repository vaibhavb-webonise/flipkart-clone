import React from 'react'

const adUrl = "https://assets.thehansindia.com/h-upload/2021/07/24/1090859-flipkart.webp"
const LoginAd = () => {
    return (
        <div className="login-ad-container">
            <div className="login-ad-top">
                <h1>Login</h1>
                <div className="login-ad-content">
                    Get access to your Orders, Wishlist and Recommendations
                </div>
            </div>


            <div className="login-ad-bottom">
                <img src={adUrl} alt=""/>
            </div>
        </div>
    )
}

export default LoginAd
