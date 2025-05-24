import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Footer from './Components/Footer'
import Navbar from './Components/Navbar'
import Home from './pages/Home'
import AboutPage from './pages/AboutPage'
import FeaturesPage from './pages/FeaturesPage'
import ShopPage from './pages/ShopPage'
import TestimonialPage from './pages/TestimonialPage'
import ErrorPage from './pages/ErrorPage'
import ContactUsPage from './pages/ContactUsPage'
import AdminHome from './pages/admin/AdminHome'
import AdminMaincategory from './pages/admin/maincategory/AdminMaincategory'
import AdminCreateMaincategory from './pages/admin/maincategory/AdminCreateMaincategory'
import AdminUpdateMaincategory from './pages/admin/maincategory/AdminUpdateMaincategory'

import AdminSubcategory from './pages/admin/subcategory/AdminSubcategory'
import AdminCreateSubcategory from './pages/admin/subcategory/AdminCreateSubcategory'
import AdminUpdateSubcategory from './pages/admin/subcategory/AdminUpdateSubcategory'

import AdminBrand from './pages/admin/brand/AdminBrand'
import AdminCreateBrand from './pages/admin/brand/AdminCreateBrand'
import AdminUpdateBrand from './pages/admin/brand/AdminUpdateBrand'

import AdminTestimonial from './pages/admin/testimonial/AdminTestimonial'
import AdminCreateTestimonial from './pages/admin/testimonial/AdminCreateTestimonial'
import AdminUpdateTestimonial from './pages/admin/testimonial/AdminUpdateTestimonial'



import AdminProduct from './pages/admin/product/AdminProduct'
import AdminCreateProduct from './pages/admin/product/AdminCreateProduct'
import AdminUpdateProduct from './pages/admin/product/AdminUpdateProduct'

import ProductPage from './pages/ProductPage'
import SignupPage from './pages/SignupPage'
import ProfilePage from './pages/ProfilePage'
import LoginPage from './pages/LoginPage'
import UpdateProfilePage from './pages/UpdateProfilePage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'

import ConfirmationPage from './pages/ConfirmationPage'
import AdminNewsletter from './pages/admin/newsletter/AdminNewsletter'
import AdminUser from './pages/admin/user/AdminUser'
import AdminCreateUser from './pages/admin/user/AdminCreateUser'
import AdminUpdateUser from './pages/admin/user/AdminUpdateUser'
import AdminContactUs from './pages/admin/Contactus/AdminContactUs'
import AdminContactUsShow from './pages/admin/Contactus/AdminContactUsShow'
import AdminCheckout from './pages/admin/checkout/AdminCheckout'
import AdminCheckoutShow from './pages/admin/checkout/AdminCheckoutShow'


export default function App() {
  return (
    <BrowserRouter>
    <Navbar/>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/about' element={<AboutPage/>}/>
            <Route path='/features' element={<FeaturesPage/>}/>
            <Route path='/shop' element={<ShopPage/>}/>
            <Route path='/testimonial' element={<TestimonialPage/>}/>
            <Route path='/contact' element={<ContactUsPage/>}/>
           
            <Route path='/*' element={<ErrorPage/>}/>
            <Route path='/product/:id' element={<ProductPage/>}/>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/signup' element={<SignupPage/>}/>

            {/* Buyer Routes */}
            {
              localStorage.getItem("login")?
              <>
              <Route path='/profile' element={<ProfilePage/>}/>
            <Route path='/update-profile' element={<UpdateProfilePage/>}/>
            <Route path='/cart' element={<CartPage/>}/>
            <Route path='/checkout' element={<CheckoutPage/>}/>
            <Route path='/confirmation' element={<ConfirmationPage/>}/>

              </>:null
            }

           {
             localStorage.getItem("login") && (localStorage.getItem("role")==="Admin" || localStorage.getItem("role")==="Super Admin")?
             <>
              <Route path='/admin' element={<AdminHome/>}/>
              <Route path='/admin/maincategory' element = {<AdminMaincategory/>}/>
            <Route path='/admin/maincategory/create' element = {<AdminCreateMaincategory/>}/>
            <Route path='/admin/maincategory/update/:id' element={<AdminUpdateMaincategory/>}/>

            <Route path='/admin/subcategory' element = {<AdminSubcategory/>}/>
            <Route path='/admin/subcategory/create' element = {<AdminCreateSubcategory/>}/>
            <Route path='/admin/subcategory/update/:id' element={<AdminUpdateSubcategory/>}/>

            <Route path='/admin/brand' element = {<AdminBrand/>}/>
            <Route path='/admin/brand/create' element = {<AdminCreateBrand/>}/>
            <Route path='/admin/brand/update/:id' element={<AdminUpdateBrand/>}/>

            <Route path='/admin/testimonial' element={<AdminTestimonial/>}/>
            <Route path='/admin/testimonial/create' element={<AdminCreateTestimonial/>}/>
            <Route path='/admin/testimonial/update/:id' element={<AdminUpdateTestimonial/>}/>

            <Route path='/admin/product' element={<AdminProduct/>}/>
            <Route path='/admin/product/create' element={<AdminCreateProduct/>}/>
            <Route path='/admin/product/update/:id' element={<AdminUpdateProduct/>}/>

          <Route path='/admin/newsletter' element={<AdminNewsletter/>}/>

          <Route path='/admin/user' element={<AdminUser/>} />
          {
            localStorage.getItem("role")==="Super Admin"?
            <>
            <Route path='/admin/user/create' element={<AdminCreateUser/>} />
            <Route path='/admin/user/update/:id' element={<AdminUpdateUser/>}/>
            </>:null
          }

          <Route path='/admin/contactus' element={<AdminContactUs/>}/>
          <Route path='/admin/contactus/show/:id' element={<AdminContactUsShow/>} />

        <Route path='/admin/checkout' element={<AdminCheckout/>}/>
        <Route path='/admin/checkout/show/:id' element={<AdminCheckoutShow/>}/>
             </>:null
             
           }

        </Routes>
    <Footer/>
    </BrowserRouter>
    
  )
}
