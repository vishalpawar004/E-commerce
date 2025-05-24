import React, { useState } from 'react'
import HeroSection from '../Components/HeroSection'

import formValidator from '../FormValidators/formValidator'
import { Link, useNavigate } from 'react-router-dom'

export default function SignupPage() {
    let [data, setData] = useState({
        name: "",
        username: "",
        email: "",
        phone: "",
        password: "",
        cpassword: ""
    })
    let [errorMessage, setErrorMessage] = useState({
        name: "Name Field is Mandatory",
        username: "User Name Field is Mendatory",
        email: "Email Address Field is Mendatory",
        phone: "Phone Number Field is Mendatory",
        password: "Password Field is Mendatory"
    })

    let [show, setShow] = useState(false)
    let navigate = useNavigate()
    function getInputData(e) {
        let { name, value } = e.target
        setErrorMessage((old) => {
            return {
                ...old,
                [name]: formValidator(e)
            }
        })
        setData((old) => {
            return {
                ...old,
                [name]: value
            }
        })
    }

    async function postData(e) {
        e.preventDefault()
        if (data.password === data.cpassword) {
            let error = Object.values(errorMessage).find((x) => x !== "")
            if (error)
                setShow(true)
            else {
               try {
                let response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/user`, {
                    method: "GET",
                    headers: {
                        "content-type": "application/json"
                    }
                })
                response = await response.json()
                let item = response.find(x => x.username === data.username || x.email === data.email)
                if (item) {
                    setShow(true)
                    setErrorMessage((old) => {
                        return {
                            ...old,
                            'username': item.username === data.username ? 'username already taken' : '',
                            'email': item.email === data.email ? 'Email already taken' : ''
                        }
                    })
                } else {
                    response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/user`, {
                        method: "POST",
                        headers: {
                            "content-type": "application/json"
                        },
                        body: JSON.stringify({
                            name: data.name,
                            username: data.username,
                            email: data.email,
                            phone: data.phone,
                            password: data.password,
                            role: "Buyer",
                            active:true
                        })
                    })
                    response = await response.json()
                    if (response) {
                        localStorage.setItem("login", true)
                        localStorage.setItem("name", response.name)
                        localStorage.setItem("useid", response.id)
                        localStorage.setItem("role", response.role)
                        navigate("/profile")
                    } else {
                        alert("Somethign Went Wrong")
                    }
                }
               } catch (error) {
                alert('Internal Server Error')
               }
            }
        }

        else {
            setShow(true)
            setErrorMessage((old) => {
                return {
                    ...old,
                    'password': 'Password and Confirm Password Does Not Matched'
                }
            })
        }



    }

    return (
        <>
            <HeroSection title="Signup - Create Your Account" />
            <div className="container-fluid my-3 mb-5">
                <div className="row">
                    <div className="col-md-8 col-sm-10 col-11 m-auto">
                        <h5 className='bg-primary text-light text-center p-2'>Create a Free Account</h5>
                        <form onSubmit={postData}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label >Name*</label>
                                    <input type="text" placeholder='Full Name' name='name' onChange={getInputData} className={`form-control border-3 ${show && errorMessage.name ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label >Phone*</label>
                                    <input type="text" placeholder='Phone' name='phone' onChange={getInputData} className={`form-control border-3 ${show && errorMessage.phone ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.phone ? <p className='text-danger'>{errorMessage.phone}</p> : null}
                                </div>

                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label >UserName*</label>
                                    <input type="text" placeholder='Username' name='username' onChange={getInputData} className={`form-control border-3 ${show && errorMessage.username ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.username ? <p className='text-danger'>{errorMessage.username}</p> : null}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label >Email*</label>
                                    <input type="email" placeholder='Email Address' name='email' onChange={getInputData} className={`form-control border-3 ${show && errorMessage.email ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.email ? <p className='text-danger'>{errorMessage.email}</p> : null}
                                </div>

                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label >Password*</label>
                                    <input type="password" placeholder='Enter the Password' name='password' onChange={getInputData} className={`form-control border-3 ${show && errorMessage.password ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.password ? <p className='text-danger'>{errorMessage.password}</p> : null}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label >Confirm Password*</label>
                                    <input type="password" placeholder='Comfirm Password' name='cpassword' onChange={getInputData} className={`form-control border-3 ${show && errorMessage.password ? 'border-danger' : 'border-primary'}`} />

                                </div>

                            </div>
                            <div className="mb-3">
                                <button type='submit' className='btn btn-primary w-100'>Signup</button>
                            </div>
                        </form>
                        <div className="mb-3">
                            <Link to="/login">Already Have An Account?Login</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
