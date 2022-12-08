import React from 'react'
import { CatergoryCollection } from '../helpers/CatergoryRoutes';
import './category.css'
import { useNavigate } from 'react-router-dom';

const CatergoryNav = () => {
    const navigate = useNavigate();
    const handleClick = linkTo => navigate(linkTo)
    return (
        <div className="category">
            {
                CatergoryCollection.map(category => (
                    <div className="category-container" key={category.url} onClick={() => handleClick(category.linkTo)}>
                        <div className="category-image-wrapper">
                            <img src={category.url} alt="" />
                        </div>
                        <div className="category-title">{category.title}</div>
                    </div>
                ))
            }
        </div>
    )
}

export default CatergoryNav
