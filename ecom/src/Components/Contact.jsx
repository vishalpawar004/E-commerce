import React, { useState } from 'react'
import formValidator from '../FormValidators/formValidator'
import { useDispatch } from 'react-redux'
import { createContactUs } from '../Redux/ActionCreartors/ContactUsActionCreators'

export default function Contact() {
    let [data, setData] = useState({
        name: '',
        email:"",
        phone: '',
        subject: '',
        message: ''
    })
    let [errorMessage, setErrorMessage] = useState({
        name: "Name Field Is Mendatory",
        email: "Email Address Field Is Mendatory",
        phone: "Phone Number Field Is Mendatory",
        subject: "Subject Field Is Mendatory",
        message: "Message Field Is Mendatory",


    })
    let [show, setShow] = useState()
    let [message, setMessage] = useState()
    let dispatch = useDispatch()

    function getInputData(e) {
        let { name, value } = e.target
        setErrorMessage((old) => {
            return {
                ...old,
                [name]: formValidator.e
            }
        })
        setData((old) => {
            return {
                ...old,
                [name]: value
            }
        })
    }

    function postData(e) {
        e.preventDefault()
        let error = Object.values(errorMessage).find(x => x !== "")
        if (error)
            setShow(true)
        else {
            dispatch(createContactUs({ ...data, active: true, date: new Date }))
            setMessage("Thanks to Share Your Query With Us. Our Team Will Contact You Soon")
            setData({
                name: '',
                email:"",
                phone: '',
                subject: '',
                message: ''
            })
        }
    }

    return (
        <>
            <div className="container-fluid py-5 mb-5">
                <div className="container">
                    <div className="text-center mx-auto pb-5 wow fadeIn" data-wow-delay=".3s" style={{ maxWidth: "600px" }}>
                        <h5 className="text-primary">Get In Touch</h5>
                        <h1 className="mb-3">Contact for any query</h1>

                    </div>
                    <div className="contact-detail position-relative p-5">
                        <div className="row g-5 mb-5 justify-content-center">
                            <div className="col-md-6 wow fadeIn" data-wow-delay=".3s">
                                <div className="d-flex bg-light p-3 rounded">
                                    <div className="flex-shrink-0 btn-square bg-secondary rounded-circle" style={{ width: "64px", height: "64px" }}>
                                        <i className="fs-3 fas fa-map-marker-alt text-white"></i>
                                    </div>
                                    <div className="ms-3">
                                        <h4 className="text-primary">Address</h4>
                                        <a href="https://www.google.com/maps/place/Khatima+Chauraha,+Khetal+Sandakham,+Khatima,+Uttarakhand+262308/@28.9197368,79.9649855,17z/data=!3m1!4b1!4m6!3m5!1s0x39a0511bf43d8651:0x735bff8b0f4af353!8m2!3d28.9197369!4d79.9698564!16s%2Fg%2F11bzmvl9w_?entry=ttu&g_ep=EgoyMDI1MDIwNC4wIKXMDSoASAFQAw%3D%3D" target="_blank" className="h5">Khatima Chauraha</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 wow fadeIn" data-wow-delay=".5s">
                                <div className="d-flex bg-light p-3 rounded">
                                    <div className="flex-shrink-0 btn-square bg-secondary rounded-circle" style={{ width: "64px", height: "64px" }}>
                                        <i className="fs-3 fa fa-phone text-white"></i>
                                    </div>
                                    <div className="ms-3">
                                        <h4 className="text-primary">Call Us</h4>
                                        <a className="h5" href="tel:8279874335" target="_blank">+91-8279874335</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 wow fadeIn" data-wow-delay=".7s">
                                <div className="d-flex bg-light p-3 rounded">
                                    <div className="flex-shrink-0 btn-square bg-secondary rounded-circle" style={{ width: "64px", height: "64px" }}>
                                        <i className="fs-3 fa fa-envelope text-white"></i>
                                    </div>
                                    <div className="ms-3">
                                        <h4 className="text-primary">Email Us</h4>
                                        <a className="h5" href="mailto:vishalpawar8924@gmail.com" target="_blank">vishalpawar8924@gmail.com</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 wow fadeIn" data-wow-delay=".5s">
                                <div className="d-flex bg-light p-3 rounded">
                                    <div className="flex-shrink-0 btn-square bg-secondary rounded-circle" style={{ width: "64px", height: "64px" }}>
                                        <i className=" fs-3 far fa-comment-dots text-white"></i>
                                    </div>
                                    <div className="ms-3">
                                        <h4 className="text-primary">Chat With Us</h4>
                                        <a className="h5" href="http://wa.me/8279874335" target="_blank">+91-8279874335</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row g-5">
                            <div className="col-lg-6 wow fadeIn" data-wow-delay=".3s">
                                <div className="p-5 h-100 rounded contact-map">
                                    <iframe width="100%" height="100%" id="gmap_canvas" src="https://maps.google.com/maps?q=Khatima%20Chauraha&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
                                </div>
                            </div>

                            <div className="col-lg-6 wow fadeIn" data-wow-delay=".5s">
                            <div className="p-5 rounded contact-form">
                                {message && <p className='text-dark text-center'>{message}</p>}
                                <form onSubmit={postData} >
                                 
                                        <div className="mb-4">
                                            <input type="text" name='name' className={`form-control border-3 py-2 ${show && errorMessage.name ? 'border-danger' : 'border-success'}`} onChange={getInputData} value={data.name} placeholder={show && errorMessage.name ? "Name Field is Mandatory" : "Your Name"} />
                                        </div>
                                        <div className="mb-4">
                                            <input type="text" name='phone' className={`form-control border-3 py-2 ${show && errorMessage.phone ? 'border-danger' : 'border-success'}`} onChange={getInputData} value={data.phone} placeholder={show && errorMessage.phone ? "Phone Number Field is Mandatory" : "Phone Number"} />
                                        </div>
                                        <div className="mb-4">
                                            <input type="email" name='email' className={`form-control border-3 py-2 ${show && errorMessage.email ? 'border-danger' : 'border-success'}`} onChange={getInputData}  value={data.email} placeholder={show && errorMessage.email ? "Email Address is Mandatory" : "Email Address"} />
                                        </div>
                                        <div className="mb-4">
                                            <input type="text" name='subject' className={`form-control border-3 py-2 ${show && errorMessage.subject ? 'border-danger' : 'border-success'}`} onChange={getInputData} value={data.subject} placeholder={show && errorMessage.name ? "Subject Field is Mandatory" : "Subject"} />
                                        </div>
                                        <div className="mb-4">
                                            <textarea name='message' className="w-100 form-control border-3 py-2" onChange={getInputData} value={data.message} rows="5" cols="10" placeholder="Message"></textarea>
                                        </div>
                                        <div className="text-start">
                                            <button className="btn bg-primary text-white py-2 px-5 w-100" type="submit">Send Message</button>
                                        </div>
                                        </form>
                                    </div>
                               
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
