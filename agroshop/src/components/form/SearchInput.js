import React from 'react'
import { useSearch } from '../../context/Search'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../hooks/helper';

const SearchInput = () => {
    const [search, setSearch] = useSearch();
    const navigate = useNavigate();
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            const {data} = await axios.get(`${BASE_URL}/api/v1/product/search/${search.keyword}`);
            //console.log(data, search.keyword);
            setSearch({...search, results: data});
            navigate('/searchnew');
        } catch (error) {
            //console.log(error)
        }
    }
    return (
        <div>
            <form className="d-flex search-form" role="search" onSubmit={handleSubmit}>
                <input className="form-control me-2 w-lg" type="search" placeholder="Search" aria-label="Search" value={search.keyword} onChange={(e)=> setSearch({...search, keyword:e.target.value})} />
                <button className="btn btn-outline-info" type="submit">Search</button>
            </form>

        </div>
    )
}

export default SearchInput
