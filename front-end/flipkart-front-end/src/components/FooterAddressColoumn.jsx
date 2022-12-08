import React from 'react'

const FooterAddressColoumn = ({ address, isLast }) => {
    return (
        <div className={`footer-address ${isLast ? 'last-address' : ''}`}>
            <div className="footer-link-title ">
                {address.title}
            </div>

            <div className={`footer-link-collection address-item`}>
                {
                    address.address.map(
                        addressLine => (addressLine.toString().includes('Telephone') ?
                            <p>Address:
                                <a href='tel:+91 9970692837'>
                                    {
                                        addressLine.split(':')[1]
                                    }
                                </a>
                            </p> :
                            <p key={addressLine}>
                                {addressLine}
                            </p>
                        )
                    )
                }
            </div>
        </div>
    )
}

export default FooterAddressColoumn
