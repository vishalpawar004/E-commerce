import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { createNewsletter, getNewsletter } from '../Redux/ActionCreartors/NewsletterActionCreators'
import { useDispatch, useSelector } from 'react-redux'
export default function Footer() {
    let [message, setMessage] = useState("")
    let [email, setEmail] = useState("")
    let NewsletterStateData = useSelector(state => state.NewsletterStateData)
    let dispatch = useDispatch()

    useEffect(() => {
        (() => {
            dispatch(getNewsletter())
        })()
    }, [NewsletterStateData.length])

    function postData(e) {
        e.preventDefault()
        if (email.length === 0)
            setMessage("Please Enter a Valid Email Address")
        else {

            let item = NewsletterStateData.find(x => x.email === email)
            if (item)
                setMessage("Yoour Email Address is Already Registered")
            else {
                dispatch(createNewsletter({ email: email, active: true }))
                setMessage("Thanks to Subscribe Out Newsletter Service")
                setEmail("")
            }
        }

    }
    return (
        <>
            <div className="container-fluid footer bg-dark wow fadeIn px-5" data-wow-delay=".3s">

                <div className="row g-5">
                    <div className="col-lg-2 col-md-6">
                        <Link to="/">
                            <h1 className="text-white fw-bold d-block">Shop<span className="text-secondary">Cart</span> </h1>
                        </Link>
                        <p className="mt-4 text-light">We Provide Upto 90% Discount on top Brands Products and we deals in Kids,Female and Male Products</p>
                        <div className="d-flex hightech-link">
                            <Link to="#" target='_blank' rel='noreferrer' className="btn-light nav-fill btn btn-square rounded-circle me-2"><i className="fab fa-facebook-f text-primary"></i></Link>
                            <Link to="#" target='_blank' rel='noreferrer' className="btn-light nav-fill btn btn-square rounded-circle me-2"><i className="fab fa-twitter text-primary"></i></Link>
                            <Link to="#" target='_blank' rel='noreferrer' className="btn-light nav-fill btn btn-square rounded-circle me-2"><i className="fab fa-instagram text-primary"></i></Link>
                            <Link to="#" target='_blank' rel='noreferrer' className="btn-light nav-fill btn btn-square rounded-circle me-0"><i className="fab fa-linkedin-in text-primary"></i></Link>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6">
                        <h3 to="#" className="h3 text-secondary">Contact Us</h3>
                        <div className="text-white mt-4 d-flex flex-column contact-link">
                            <Link to="#" target='_blank' rel='noreferre' className="pb-3 text-light border-bottom border-primary"><i className="fas fa-map-marker-alt text-secondary me-2"></i> A-42,Sector-16 ,Noida, India</Link>
                            <Link to="#" target='_blank' rel='noreferre' className="py-3 text-light border-bottom border-primary"><i className="fas fa-phone-alt text-secondary me-2"></i> +91-8279874335</Link>
                            <Link to="mailto:vishalpawar8924@gmail.com" target='_blank' rel='noreferre' className="py-3 text-light border-bottom border-primary"><i className="fas fa-envelope text-secondary me-2"></i> vishalpawar8924@gmail.com</Link>
                        </div>
                    </div>

                    <div className="col-lg-2 col-md-6">
                        <h3 to="#" className="h3 text-secondary">Quick Link</h3>
                        <div className="mt-4 d-flex flex-column short-link">
                            <Link to="/" target='_blank' rel='noreferre' className="mb-2 text-white"><i className="fas fa-angle-right text-secondary me-2"></i>Home</Link>
                            <Link to="/about" target='_blank' rel='noreferre' className="mb-2 text-white"><i className="fas fa-angle-right text-secondary me-2"></i>About</Link>
                            <Link to="/shop" target='_blank' rel='noreferre' className="mb-2 text-white"><i className="fas fa-angle-right text-secondary me-2"></i>Shop</Link>
                            <Link to="/features" target='_blank' rel='noreferre' className="mb-2 text-white"><i className="fas fa-angle-right text-secondary me-2"></i>Features</Link>
                            <Link to="/testimonial" target='_blank' rel='noreferre' className="mb-2 text-white"><i className="fas fa-angle-right text-secondary me-2"></i>Testimonial</Link>


                        </div>
                    </div>
                    <div className="col-lg-2 col-md-6">
                        <h3 to="#" className="h3 text-secondary">Quicks Link</h3>
                        <div className="mt-4 d-flex flex-column short-link">
                            <Link to="#" className="mb-2 text-white"><i className="fas fa-angle-right text-secondary me-2"></i>Contact Us</Link>
                            <Link to="#" target='_blank' rel='noreferre' className="mb-2 text-white"><i className="fas fa-angle-right text-secondary me-2"></i>Privacy Policy</Link>
                            <Link to="#" target='_blank' rel='noreferre' className="mb-2 text-white"><i className="fas fa-angle-right text-secondary me-2"></i>Terms & Conditions</Link>
                            <Link to="#" target='_blank' rel='noreferre' className="mb-2 text-white"><i className="fas fa-angle-right text-secondary me-2"></i>Refund Policy</Link>
                            <Link to="#" target='_blank' rel='noreferre' className="mb-2 text-white"><i className="fas fa-angle-right text-secondary me-2"></i>Latest Blog</Link>


                        </div>
                    </div>


                    <div className="col-lg-3 col-md-12">
                        <h3 to="#" className="h3 text-secondary mb-4">Newsletter</h3>
                        <h6 className='text-light'>{message ? message : 'Subscribe Our Newsletter Service to Get Latest Update Our New Products and Great Deals'}</h6>
                        <div className="text-white mt-4 d-flex flex-column contact-link">
                            <form onSubmit={postData}>
                                <div className="mb-3">
                                    <input type='email' name='email' onChange={(e) => setEmail(e.target.value)} value={email} className='form-control' placeholder='Email Address' />
                                </div>
                                <button className='btn btn-secondary w-100  ' type='submit'>Subscribe</button>


                            </form>

                        </div>
                    </div>
                </div>
                <hr className="text-light mt-5 mb-4" />
                <div className="row">
                    <div className="col-md-6 text-center text-md-start">
                        <span className="text-light"><Link to="#" className="text-secondary"><i className="fas fa-copyright text-secondary me-2"></i>ShopCart</Link>, All right reserved.</span>
                    </div>

                </div>
            </div>

        </>
    )
}
