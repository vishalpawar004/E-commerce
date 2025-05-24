import React, { useEffect, useState } from 'react'
import HeroSection from '../Components/HeroSection'

import formValidator from '../FormValidators/formValidator'
import imageValidator from '../FormValidators/imageValidator'
import { Link, useNavigate } from 'react-router-dom'

export default function UpdateProfilePage() {
    let [data, setData] = useState({
        name: "",
        phone: "",
        address: "",
        pin: "",
        city: "",
        state: "",
        pic: ""
    })
    let [errorMessage, setErrorMessage] = useState({
        name: "",
        phone: "",
        pic: "",
    })

    let [show, setShow] = useState(false)
    let navigate = useNavigate()
    function getInputData(e) {
        let name = e.target.name
        // let value = e.target.files ? e.target.files[0].name : e.target.value // in case of real backend
        let value = e.target.files ? "product/" + e.target.files[0].name : e.target.value
        if (name !== "active") {
            setErrorMessage((old) => {
                return {
                    ...old,
                    [name]: e.target.files ? imageValidator(e) : formValidator(e)
                }

            })
        }
        setData((old) => {
            return {
                ...old,
                [name]: value
            }


        })
    }

    async function postData(e) {
        e.preventDefault()
        let error = Object.values(errorMessage).find((x) => x !== "")
        if (error)
            setShow(true)
        else {
            try {

                let response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/user/${localStorage.getItem('useid')}`, {
                    method: "PUT",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({ ...data })
                })
                response = await response.json()
                if (response) {
                    if (data.role === 'Buyer')
                        navigate("/profile")
                    else
                        navigate('/admin')
                } else {
                    alert("Somethign Went Wrong")
                }

            } catch (error) {
                alert('Internal Server Error')
            }
        }
    }
    useEffect(() => {
        (async () => {
            try {
                let response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/user/${localStorage.getItem("useid")}`, {
                    method: "GET",
                    headers: {
                        "content-type": "application/json"
                    }
                })
                response = await response.json()
                if (response)
                    setData(response)
            } catch (error) {
                alert("internal Server Error")
            }
        })()
    }, [])
    return (
        <>
            <HeroSection title="Update Your Account" />
            <div className="container-fluid my-3 mb-5">
                <div className="row">
                    <div className="col-md-8 col-sm-10 col-11 m-auto">
                        <h5 className='bg-primary text-light text-center p-2'>Update Your Profile</h5>
                        <form onSubmit={postData}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label >Name*</label>
                                    <input type="text" placeholder='Full Name' value={data.name} name='name' onChange={getInputData} className={`form-control border-3 ${show && errorMessage.name ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label >Phone*</label>
                                    <input type="text" placeholder='Phone' value={data.phone} name='phone' onChange={getInputData} className={`form-control border-3 ${show && errorMessage.phone ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.phone ? <p className='text-danger'>{errorMessage.phone}</p> : null}
                                </div>

                            </div>

                            <div className="mb-3">
                                <label >Address*</label>
                                <textarea placeholder='Address...' name='address' value={data.address} onChange={getInputData} className='form-control border-3 border-primary' ></textarea>
                                {/* {show && errorMessage.email ? <p className='text-danger'>{errorMessage.email}</p> : null} */}
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label >City</label>
                                    <input type="text" placeholder='City Name' value={data.city} name='city' onChange={getInputData} className='form-control border-3  border-primary' />

                                </div>
                                <div className="col-md-6 mb-3">
                                    <label >State</label>
                                    <input type="text" placeholder='State' value={data.state} name='state' onChange={getInputData} className='form-control border-3  border-primary' />
                                </div>

                            </div>
                          
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label >Pin Code</label>
                                    <input type="text" placeholder='Pin' value={data.pin} name='pin' onChange={getInputData} className='form-control border-3  border-primary' />

                                </div>
                                <div className="col-md-6 mb-3">
                                    <label >Pic</label>
                                    <input type="file"   name='pic' onChange={getInputData} className={`form-control border-3 ${show && errorMessage.pic ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.pic ? <p className='text-danger'>{errorMessage.pic}</p> : null}
                                </div>

                            </div>
                            <div className="mb-3">
                                <button type='submit' className='btn btn-primary w-100'>Update</button>
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
