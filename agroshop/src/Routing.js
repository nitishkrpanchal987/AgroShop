import { Route, Routes } from "react-router-dom";

import React from 'react'
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import Pagenotfound from "./pages/Pagenotfound";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/user/Dashboard";
import Private from "./components/routes/Private";
import ForgotPassword from "./pages/auth/ForgotPassword";
import AdminAuth from "./components/routes/AdminAuth";
import AdminDashboard from "./pages/amin/AdminDashboard";
import CreateCategory from "./pages/amin/CreateCategory";
import CreateProduct from "./pages/amin/CreateProduct";
import Profile from "./pages/user/Profile";
import Orders from "./pages/user/Orders";
import Products from "./pages/amin/Products";
import UpdateProduct from "./pages/amin/UpdateProduct";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";
import CategoryProduct from "./pages/CategoryProduct";
import CartPage from "./pages/CartPage";
import AdminOrders from "./pages/amin/AdminOrders";

const Routing = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/categories' element={<Categories />} />
      <Route path='/cart' element={<CartPage />} />
      <Route path='/category/:slug' element={<CategoryProduct />} />
      <Route path='/searchnew' element={<Search />} />
      <Route path='/product/:slug' element={<ProductDetails />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/policy' element={<Policy />} />
      <Route path='/*' element={<Pagenotfound />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/dashboard' element={<Private />}>
        <Route path='user' element={<Dashboard />} />
        <Route path='user/profile' element={<Profile />} />
        <Route path='user/orders' element={<Orders />} />
      </Route>
      <Route path='/dashboard' element={<AdminAuth />}>
        <Route path='admin' element={<AdminDashboard />} />
        <Route path='admin/create-category' element={<CreateCategory />} />
        <Route path='admin/create-product' element={<CreateProduct />} />
        <Route path='admin/product/:slug' element={<UpdateProduct />} />
        <Route path='admin/products' element={<Products />} />
        {/* <Route path='admin/users' element={<Users />} /> */}
        <Route path='admin/orders' element={<AdminOrders />} />
      </Route>
    </Routes>
  )
}

export default Routing
