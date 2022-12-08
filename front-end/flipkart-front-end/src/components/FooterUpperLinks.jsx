import React from 'react'
import { footerAddesses, footerLinks } from '../helpers/FooterData';
import FooterAddressColoumn from './FooterAddressColoumn';
import FooterLinkColoumn from './FooterLinkColoumn';

const FooterUpperLinks = () => {
    return (
        <div className="footer-links">
            {/* left side links */}
            {
                footerLinks.map(footerLink => (
                    <div className="footer-first"> <FooterLinkColoumn className="footer-first" footerLink={footerLink} /></div>
                ))
            }

            {/* right side address */}
            {
                footerAddesses.map((address,index) => (
                    <FooterAddressColoumn address={address} isLast={ footerAddesses.length - 1 === index} />
                ))
            }
        </div>
    )
}

export default FooterUpperLinks
