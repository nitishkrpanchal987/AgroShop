import { BASE_URL } from '../../hooks/helper';
import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../../styles/AuthStyles.css'
import { useAuth } from '../../context/auth';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation()
    const [auth, setAuth] = useAuth();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${BASE_URL}/api/v1/auth/login`, { email, password });
            if (res?.data.success) {
                toast.success(res.data.message);
                setAuth({
                    ...auth, 
                    user: res.data.user,
                    token: res.data.token
                })
                // //console.log(auth);
                localStorage.setItem('auth', JSON.stringify(res.data));
                navigate(location?.state || '/')
            }
            else {
                toast.error(res.data.message);
            }
        } catch (err) {
            //console.log("Error", err);
            toast.success('Something went wrong');
        }
    }
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  return (
    <Layout title="Register">
      <div className="form-container" style={{ minHeight: "90vh" }}>
        <form onSubmit={handleSubmit}>
          <h4 className="title" style={{color: 'rgb(35, 90, 35)'}}>LOGIN FORM</h4>
          
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Email "
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              required
            />
          </div>
          <div className="mb-3">
          <button type='button' className="btn btn-primary" onClick={()=>{navigate('/forgot-password')}}>
            Forgot Password
          </button>
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default Login
