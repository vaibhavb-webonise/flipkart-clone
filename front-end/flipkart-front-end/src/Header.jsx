import React, { useState } from 'react'
import './header.css'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Dialog } from '@mui/material';
import LoginComponent from './components/LoginComponent';
import { useCookies } from 'react-cookie';
import { useUserValue } from './helpers/ContextInfo';
import { getFirstLetterCapitalName } from './helpers/functions';
const Header = () => {
    const [{ userId }] = useCookies(['user']);
    const [state] = useUserValue();
    const [open, setOpen] = useState(!userId)
    const flipkartLogo = "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png";

    const handleLogoClick = () => {
        window.location.reload()
    }

    const toggleOpen = () => {
        setOpen(!open);
    }
    return (
        <div className="header">
            <div className="header-content-group">
                <div className="logo-wrapper"><img onClick={handleLogoClick} src={flipkartLogo} alt=""/></div>
                <div className="search-input">
                    <input type="text" className="searchbox" placeholder="Search for products, brands and more" />
                    <SearchIcon className="search" />
                </div>
                {state?.user ? <span className="seller">hello {getFirstLetterCapitalName(state.user?.firstName)}</span> : <button className="login-button" onClick={toggleOpen}>Login</button>}
                <span className="seller">Become a Seller</span>
                <span className="seller">More</span>
                <div className="cart">
                    <ShoppingCartIcon /><span className="cart-text">Cart</span>
                </div>
            </div>

            <Dialog open={open} maxWidth="md">
                <LoginComponent onClose={toggleOpen} />
            </Dialog>
        </div>
    )
}

export default Header
