import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BASE_URL } from './helper';

const useCategory = () => {
    const [categories, setCategories] = useState([]);
    const getCategories = async()=>{
        try {
            const { data } = await axios.get(`${BASE_URL}/api/v1/category/categories`);
            setCategories(data?.category);
        } catch (error) {
            //console.log(error);
        }
    }
    useEffect(()=>{
        getCategories();
    }, []);
    // //console.log(categories);
    return categories;
};

export default useCategory
