import { BASE_URL } from '../../hooks/helper'
import React, { useEffect, useState } from 'react'
import AdminMenu from '../../components/layout/AdminMenu'
import Layout from '../../components/layout/Layout'
import { toast } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Products = () => {
    const [products, setProducts] = useState([]);

    const getAllProduct = async () => {
        try {
            const { data } = await axios.get(`${BASE_URL}/api/v1/product/get-products`);
            setProducts(data?.products);
            // //console.log(data?.products)
        } catch (error) {
            //console.log(error);
            toast.error('Something went wrong');
        }
    }
    useEffect(() => {
        getAllProduct();
    }, [])
    return (
        <Layout>
            <div className="container-fluid m-3 p-3">
                <div className="row dashboard">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1 className="text-center">All Products List</h1>
                        <div className="d-flex flex-wrap">
                            {products?.map((p) => (
                                <Link
                                    key={p._id}
                                    to={`/dashboard/admin/product/${p.slug}`}
                                    className="product-link"
                                >
                                    <div className="card m-2" style={{ width: "18rem" }}>
                                        <img
                                            src={`${BASE_URL}/api/v1/product/product-photo/${p._id}`}
                                            className="card-img-top"
                                            alt={p.name}
                                            height={'150px'}
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">{p.name}</h5>
                                            <p className="card-text">{p.description.substring(0, 60)}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Products
