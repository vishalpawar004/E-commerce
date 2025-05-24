import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
    let navigator = useNavigate()
    function logout(){
        localStorage.clear()
        navigator("/login")
    }
    return (
        <>
            <div className="container-fluid bg-dark py-2 d-none d-md-flex ">
                <div className="container">
                    <div className="d-flex justify-content-between topbar">
                        <div className="top-info">
                            <small className="me-3 text-white-50"><Link to="mailto:vishalpawar8924@gmail.com" target='_blank' rel='noreferrer' className='text-light'><i className="fas fa-envelope me-2 text-secondary"></i>vishalpawar8924@gmail.com</Link></small>
                            <small className="me-3 text-white-50"><Link to="tel:+918279874335" target='_blank' rel='noreferrer' className='text-light'><i className="fas fa-phone me-2 text-secondary"></i>+91-8279874335</Link></small>

                        </div>
                        <div className="top-link">
                            <a href="" className="bg-light nav-fill btn btn-sm-square rounded-circle"><i className="fab fa-facebook-f text-primary"></i></a>
                            <a href="" className="bg-light nav-fill btn btn-sm-square rounded-circle"><i className="fab fa-twitter text-primary"></i></a>
                            <a href="" className="bg-light nav-fill btn btn-sm-square rounded-circle"><i className="fab fa-instagram text-primary"></i></a>
                            <a href="" className="bg-light nav-fill btn btn-sm-square rounded-circle me-0"><i className="fab fa-linkedin-in text-primary"></i></a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid bg-primary sticky-top">
                <div className="container">
                    <nav className="navbar navbar-dark navbar-expand-lg py-0">
                        <a href="index.html" className="navbar-brand">
                            <h1 className="text-white fw-bold d-block">Shope<span className="text-secondary">Cart</span> </h1>
                        </a>
                        <button type="button" className="navbar-toggler me-0" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse bg-transparent" id="navbarCollapse">
                            <div className="navbar-nav ms-auto mx-xl-auto p-0">
                                <Link to="/" className="nav-item nav-link">Home</Link>
                                <Link to="/about" className="nav-item nav-link">About</Link>
                                <Link to="/shop" className="nav-item nav-link">Shop</Link>
                                <Link to="/testimonial" className="nav-item nav-link">Testimonials</Link>
                                <Link to="/features" className="nav-item nav-link">Features</Link>
                                <Link to="/contact" className="nav-item nav-link">Contact Us</Link>
                                {/* <Link to="/admin" className="nav-item nav-link">Admin</Link> */}


                            </div>
                        </div>
                        <div className="d-none d-xl-flex flex-shirink-0">
                            <div id="phone-tada" className="d-flex align-items-center justify-content-center me-4">
                                <a href="" className="position-relative animated tada infinite">
                                    <i className="fa fa-phone-alt text-white fa-2x"></i>
                                    <div className="position-absolute" style={{ top: "-7px", left: "20px" }}>
                                        <span><i className="fa fa-comment-dots text-secondary"></i></span>
                                    </div>
                                </a>
                            </div>
                            <div className="d-flex flex-column">
                                <span className="text-white-50">Have any questions?</span>
                                <span className="text-secondary">Call:<Link to="tel:+918279874335" className='text-light' target='_blank' rel='noreferrer'>+91-8279874335</Link></span>

                            </div>
                            <div className="collapse navbar-collapse bg-transparent" id="navbarCollapse">
                                <div className="navbar-nav ms-auto mx-xl-auto p-0">
                                   {
                                    localStorage.getItem("login")?
                                    <div className="nav-item dropdown">
                                    <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">{localStorage.getItem("name")}</a>
                                    <div className="dropdown-menu rounded">
                                        {
                                            localStorage.getItem("role") === "Buyer" ?
                                                <>
                                                    <Link to="/profile" className="dropdown-item">Profile</Link>
                                                    <Link to="/cart" className="dropdown-item">Cart</Link>
                                                    <Link to="/checkout" className="dropdown-item">Checkout</Link>
                                                </> :
                                                <Link to="/admin" className="dropdown-item">Admin</Link>


                                        }
                                        <button className="dropdown-item" onClick={logout}>Logout</button>
                                    </div>
                                </div>:
                                    <Link to="/login" className="nav-item nav-link">Login</Link>
                                }

                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    )
}
