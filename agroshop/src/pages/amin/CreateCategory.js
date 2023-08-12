import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import CategoryForm from '../../components/form/CategoryForm';
import { Modal } from 'antd'
import { BASE_URL } from '../../hooks/helper';

const CreateCategory = () => {
    const [categories, setCategories] = useState([]);
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatedName, setUpdatedName] = useState("");
    //get all categories
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${BASE_URL}/api/v1/category/categories`);
            if (data.success) {
                setCategories(data.category);
            }
        } catch (error) {
            //console.log(error);
            toast.error("something went wrong with categories");
        }
    }

    useEffect(() => {
        getAllCategory();
    }, [])

    // create Categories
    const [name, setName] = useState('');
    
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            const {data} = await axios.post(`${BASE_URL}/api/v1/category/create-category`, {name});
            if(data?.success){
                toast.success(`${name} is created`);
                setName('');
                getAllCategory();
            }
            else{
                toast.error(data.message);
            }
        } catch (error) {
            //console.log('error', error);
            toast.error("something went wrong in input form");
        }
    }

    // update category
    const handleUpdate = async(e)=>{
        e.preventDefault();
        try {
            const {data} = await axios.put(`${BASE_URL}/api/v1/category/update-category/${selected._id}`, {name:updatedName});
            if(data.success){
                toast.success(`${updatedName} is updated`);
                setSelected(null);
                setUpdatedName("");
                setVisible(false);
                getAllCategory();
            }else{
                toast.error(data.message);
            }
        } catch (error) {
            //console.log('error', error);
            toast.error("something went wrong in updating form");
        }
    }

    // delete category
    const handleDelete = async(pid)=>{
        try {
            const {data} = await axios.delete(`${BASE_URL}/api/v1/category/delete-category/${pid}`);
            if(data.success){
                toast.success(`category is deleted`);
                getAllCategory();
            }else{
                toast.error(data.message);
            }
        } catch (error) {
            //console.log('error', error);
            toast.error("something went wrong in updating form");
        }
    }

    return (
        <Layout>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />

                    </div>
                    <div className="col-md-9">
                        <h3>Manage category</h3>
                        <div className="p-3">
                            <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName}/>
                        </div>
                        <div className='w-75'>
                            <table class="table">
                                <thead>
                                    <tr>
                                        {/* <th scope="col">#</th>
                                        <th scope="col">First</th> */}
                                        <th scope="col">Name</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* <tr>
                                        <th scope="row">1</th>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                    </tr> */}
                                    
                                        {categories?.map(c => (
                                            <>
                                            <tr>
                                                <td key={c._id}>{c.name}</td>
                                                <td>
                                                <button className="btn btn-primary ms-2"
                                                onClick={()=>{setVisible(true); setUpdatedName(c.name);setSelected(c)}}>Edit</button>
                                                <button className="btn btn-danger ms-2" onClick={()=>{handleDelete(c._id)}}>Delete</button>
                                                </td>
                                            </tr>
                                            </>
                                        ))}
                                    
                                </tbody>
                            </table>
                        </div>
                        <Modal onCancel={()=>setVisible(false)} footer={null} visible={visible}>
                            <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate}/>
                        </Modal>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateCategory
