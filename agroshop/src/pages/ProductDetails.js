import { BASE_URL } from '../hooks/helper'
import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import { useNavigate, useParams } from 'react-router-dom'
import '../styles/ProductDetailsStyles.css'
import axios from 'axios';
import { useCart } from '../context/cart';
import { toast } from 'react-hot-toast';
import "./productdetails.css"
import o4 from "../images/offer4.avif"
import o5 from "../images/butleft.webp"
import { BsGlobeAmericas } from "react-icons/bs";
import { BsDatabaseFillLock } from "react-icons/bs";
import { FcLightAtTheEndOfTunnel } from "react-icons/fc";


const ProductDetails = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [product, setProduct] = useState({});
    const [related, setRelated] = useState([]);
    const [cart, setCart] = useCart();
    const getProduct = async () => {
        try {
            const { data } = await axios.get(`${BASE_URL}/api/v1/product/get-product/${params.slug}`);
            setProduct(data?.product);
            getSimiliarProduct(data?.product._id, data?.product.category._id);
        } catch (error) {
            //console.log(error);
        }
    }
    useEffect(() => {
        if (params?.slug) getProduct();
    }, [params?.slug])

    const getSimiliarProduct = async (pid, cid) => {
        try {
            const { data } = await axios.get(`${BASE_URL}/api/v1/product/related-product/${pid}/${cid}`);
            //console.log(data);
            setRelated(data?.products);
        } catch (error) {
            //console.log(error);
        }
    }
    return (
        <Layout>
            <div className="cat" style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem', color: 'green' }}>
                <h2>{product?.category?.name}</h2>
            </div>
            <div className="desc" style={{ marginTop: '1rem' }}>
                <div className="descimg">
                    <img
                        src={`${BASE_URL}/api/v1/product/product-photo/${product?._id}`}
                        className="card-img-top"
                        alt={product?.name}
                        height='300vh' s
                        width='25vw'
                    />
                </div>
                <div className="descdesc" style={{ lineHeight: '10px', marginTop: '2rem' }}>
                    <p style={{ fontSize: '2rem' }}>Saaf Fungicides</p>
                    <p style={{ lineHeight: '20px' }}>{product?.description}</p>
                    <p style={{ fontSize: '1.5rem' }}>Price: {product?.price?.toLocaleString("en-US", {
                        style: "currency",
                        currency: "INR",
                    })}</p>
                    <img src={o4} alt="" style={{ marginTop: '2rem' }} />
                    <p style={{ marginTop: '3rem', fontWeight: 'bold' }}><BsGlobeAmericas />  Country of origin: India</p>
                    <p style={{ fontWeight: 'bold' }}><BsDatabaseFillLock />  Secure payments</p>
                    <p style={{ fontWeight: 'bold' }}><FcLightAtTheEndOfTunnel />  In stock, ready to ship</p>
                </div>
            </div>
            <div className="but">
                <div className="butleft">
                    <img src={o5} alt="" className='butleftimg' />
                </div>
                <div className="butright">
                    <button className="buy" onClick={() => {
                        const id = product._id;
                        let flag = 0;
                        cart.forEach((ele) => {
                            if (ele._id === id) flag = 1;
                        });
                        if (!flag) {
                            setCart([...cart, product]);
                            localStorage.setItem(
                                "cart",
                                JSON.stringify([...cart, product])
                            );
                        }
                        navigate('/cart');
                    }}>
                        Buy Now
                    </button>
                    <button className="addtocart" onClick={() => {
                        setCart([...cart, product]);
                        localStorage.setItem(
                            "cart",
                            JSON.stringify([...cart, product])
                        );
                        toast.success("Item Added to cart");
                    }}>
                        Add To Cart
                    </button>
                </div>
            </div>
            <div className="cat" style={{ display: 'flex', justifyContent: 'left', marginTop: '4rem', color: 'green', marginLeft: '2vw' }}>
                <h2>Similar Products:-</h2>
            </div>
            {/* <div className="row container mt-4">
                <div className="col-md-6">
                    <img
                        src={`${BASE_URL}/api/v1/product/product-photo/${product?._id}`}
                        className="card-img-top"
                        alt={product?.name}
                        height='300vh'
                        width='25vw'
                    />
                </div>
                <div className="col-md-6">
                    <h2 className='text-center'>Product details</h2>
                    <h6>Name: {product?.name}</h6>
                    <h6>Description: {product?.description}</h6>
                    <h6>Price: {product?.price}</h6>
                    <h6>Category: {product?.category?.name}</h6>
                    <button className='btn btn-secondary' onClick={() => {
                        setCart([...cart, product]);
                        localStorage.setItem(
                            "cart",
                            JSON.stringify([...cart, product])
                        );
                        toast.success("Item Added to cart");
                    }}>Add to Cart</button>
                </div>
            </div>
            <div className="row container mt-4">
                <h2>Similiar Products</h2>
                <div className="d-flex flex-wrap">
                    {related.length < 1 && (<p className='text-center'>No similiar products</p>)}
                    {related?.map((p) => (
                        <div className="card m-2" style={{ width: "18rem" }}>
                            <img
                                src={`${BASE_URL}/api/v1/product/product-photo/${p._id}`}
                                className="card-img-top"
                                alt={p.name}
                                height={'200px'}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{p.name}</h5>
                                <p className="card-text">{p.description.substring(0, 60)}</p>
                                <p className="card-text">Rs{p.price}</p>
                                <button className='btn btn-secondary ms-3' onClick={() => {
                                    setCart([...cart, product]);
                                    localStorage.setItem(
                                        "cart",
                                        JSON.stringify([...cart, product])
                                    );
                                    toast.success("Item Added to cart");
                                }}>Add to Cart</button>
                            </div>
                        </div>

                    ))}
                </div>
            </div> */}
            <div className="row container mt-2">
                <div className="d-flex flex-wrap">
                    {related.length < 1 && (<p className='text-center'>No similiar products</p>)}
                    {related?.map((p) => (
                        <div className="card m-2" style={{ width: "18rem" }}>
                            <img
                                src={`${BASE_URL}/api/v1/product/product-photo/${p._id}`}
                                className="card-img-top"
                                alt={p.name}
                                height={'200px'}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{p.name}</h5>
                                <p className="card-text">{p.description.substring(0, 40)}</p>
                                <p className="card-text"><b>Price:</b> {p?.price?.toLocaleString("en-US", {
                                    style: "currency",
                                    currency: "INR",
                                })}</p>
                                <button className='btn btn-success ms-1' onClick={() => {
                                    setCart([...cart, product]);
                                    localStorage.setItem(
                                        "cart",
                                        JSON.stringify([...cart, product])
                                    );
                                    toast.success("Item Added to cart");
                                }}>Add to Cart</button>
                            </div>
                        </div>

                    ))}
                </div>
            </div>
        </Layout>
    )
}

export default ProductDetails
