import { BASE_URL } from '../../hooks/helper';
import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../../styles/AuthStyles.css'
// import '../../styles/'
import { useAuth } from '../../context/auth';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${BASE_URL}/api/v1/auth/forgot-password`, { email, newpassword, answer });
            if (res && res.data.success) {
                toast.success(res?.data.message);
                
                navigate('/login')
            }
            else {
                toast.error(res?.data.message);
            }
        } catch (err) {
            //console.log("Error", err);
            toast.success('Something went wrong');
        }
    };
    const [email, setEmail] = useState("");
    const [newpassword, setnewpassword] = useState("");
    const [answer, setAnswer] = useState("");
    return (
        <Layout title="Register">
            <div className="form-container" style={{ minHeight: "90vh" }}>
                <form onSubmit={handleSubmit}>
                    <h4 className="title">REGISTER FORM</h4>

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
                            value={newpassword}
                            onChange={(e) => setnewpassword(e.target.value)}
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Enter Your New Password"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Enter Your favorite sport"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        RESET
                    </button>
                </form>
            </div>
        </Layout>
    )
}

export default ForgotPassword
