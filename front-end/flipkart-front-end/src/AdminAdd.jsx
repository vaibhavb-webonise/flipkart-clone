import { CircularProgress } from '@mui/material';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { fetchAPIResponse } from './Utils';

export const AdminAdd = () => {
    const [product, setProduct] = useState({});
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [sucess, setSucess] = useState('');
    const navigate = useNavigate();

    const onChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value })
    }

    const clickHandler = async () => {
        setError('');
        setLoading(true);
        setSucess('');

        try {
            const resp = await fetchAPIResponse('addproduct', product)
            if (resp.status === 201) {
                setProduct({});
                setSucess('product succesfully added')
            }
            else {
                setError('Something went wrong ', resp.statusText)
            }
        } catch (e) {
            setError('Something went wrong')
        } finally {
            setLoading(false);
        }
    }

    const backtoApp = () => {
        navigate('/')
    }

    return (
        <div className="main-container">
            <div className="app">
                <button className='button-button' onClick={backtoApp}>Back to app</button>
                <div className="form-container" >
                    {
                        loading ? <CircularProgress /> :
                            <>
                                <input placeholder="productId" name="productId" onChange={onChange} value={product.productId} />
                                <input placeholder="product name" name="name" onChange={onChange} value={product.name} />
                                <input placeholder="price" name="price" onChange={onChange} value={product.price} />
                                <input placeholder="rating" name="rating" onChange={onChange} value={product.rating} />
                                <input placeholder="category" name="category" onChange={onChange} value={product.category} />
                                <input placeholder="number of units" name="numberOfUnits" onChange={onChange} value={product.numberOfUnits} />
                                <textarea placeholder="description" rows="4" name="description" onChange={onChange} value={product.description} />
                                <input placeholder="image Url" name="imgUrl" onChange={onChange} value={product.imgUrl} />
                                {error}
                                {sucess}
                                <button onClick={clickHandler} disabled={Object.keys(product).length !== 8}>Add Product</button></>
                    }
                </div>
            </div>
            <div className="image-container">
                {product.imgUrl ?
                    <img src={product.imgUrl} alt="product image" /> :
                    <div className="image-container-text">
                        Your image will display here
                    </div>}
            </div>

        </div>
    )
}



