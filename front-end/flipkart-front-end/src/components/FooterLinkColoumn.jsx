import React from 'react'

const FooterLinkColoumn = ({ footerLink }) => {
    return (
        <div className="footer-link-container">
            <div className="footer-link-title">{footerLink?.heading ?? footerLink?.heading?.title}</div>
            <div className="footer-link-collection">
                {footerLink.ChildLinks.map(linkAnchor => (
                    <div className="footer-link-anchor">
                        <a href={linkAnchor?.linkTo ?? 'http://google.com'} target="_blank">{linkAnchor?.title ?? linkAnchor}</a>
                    </div>
                )
                )}
            </div>
        </div>
    )
}

export default FooterLinkColoumn
