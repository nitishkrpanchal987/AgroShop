import { BASE_URL } from '../hooks/helper'
import React from 'react'
import Layout from '../components/layout/Layout'
import { useSearch } from '../context/Search'

const Search = () => {
    const [values, setValues] = useSearch();
    return (
        <Layout title={'AgroShop - search input'}>
            <div className="container mt-3">
                <div className="text-center">
                    <h2>Search Result</h2>
                    <h6>{values?.results.length < 1 ? "no product fount" : `Found ${values?.results.length}`}</h6>
                    <div className="d-flex flex-wrap">
                        {values?.results.map((p) => (
                            <div className="card m-2" style={{ width: "18rem" }}>
                                <img
                                    src={`${BASE_URL}/api/v1/product/product-photo/${p._id}`}
                                    className="card-img-top"
                                    alt={p.name}
                                    height={'250px'}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">{p.description.substring(0, 60)}</p>
                                    <p className="card-text">{p.price.toLocaleString("en-US", {
                                        style: "currency",
                                        currency: "INR",
                                    })}</p>
                                    <button className='btn btn-primary ms-2'>More Details</button>
                                    <button className='btn btn-secondary ms-3'>Add to Cart</button>
                                </div>
                            </div>

                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Search
