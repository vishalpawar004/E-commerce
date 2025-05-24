import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


import HeroSection from '../../../Components/HeroSection'
import AdminSidebar from '../../../Components/AdminSidebar'


import formValidator from '../../../FormValidators/formValidator'


export default function AdminCreateUser() {
    let [UserStateData, setUserStateData] = useState([])
    let [data, setData] = useState({
        name: "",
        username: "",
        email: "",
        phone: "",
        role: "Admin",
        password: "",
        cpassword: "",
        active: true
    })
    let [error, setError] = useState({
        name: "Name Field is Mendatory",
        username: "Username Field is Mendatory",
        email: "Email Address Field is Mendatory",
        phone: "Phone Number Field is Mendatory",
        password: "Password Field is Mendatory",


    })
    let [show, setShow] = useState(false)
    let navigate = useNavigate()




    function getInputData(e) {
        let { name, value } = e.target

        if (name !== "active") {
            setError((old) => {
                return {
                    ...old,
                    [name]: formValidator(e)
                }

            })
        }
        setData((old) => {
            return {
                ...old,
                [name]: name === "active" ? (value === "1" ? true : false) : value
            }


        })
    }
    async function postData(e) {
        e.preventDefault()
        if(data.password === data.cpassword){
            let errorItem = Object.values(error).find(x => x !== "")
        if (errorItem) {
            setShow(true)
        } else {
            let item = UserStateData.find(x => x.username === data.username || x.email === data.email)
            if (item) {
                setShow(true)
                setError((old) => {
                    return {
                        ...old,
                        "username": item.username === data.username ? "Usenamer Already Exist" : "",
                        "email": item.email === data.email ? "Email Already Exist" : "",

                    }
                })
            } else {
                let item = {
                    name: data.name,
                    username: data.username,
                    email: data.email,
                    phone: data.phone,
                    role: data.role,
                    password: data.password,
                    active: data.active

                }
                let response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/user`, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(item)
                    //bosy:item
                })


                //in case of real backend and form has a file field

                //    let formData = new FormData()
                //    formData.append("name",data.name)
                //    formData.append("pic",data.pic)
                //    formData.append("active",data.active)
                //    dispatch(createUser(formData))
                response = await response.json()
                if (response)
                    navigate("/admin/user")
                else
                    alert("Something Went Wrong")


            }

        }
        }else{
            setShow(true)
            setError((old) => {
                return {
                    ...old,
                    'password': 'Password and Confirm Password Does Not Matched'
                }
            })
        }
        

    }

    useEffect(() => {
        (async () => {
            let response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/user`, {
                method: "GET",
                headers: {
                    "content-type": "application/json"
                },

            })
            response = await response.json()

            setUserStateData(response)

        })()
    }, [UserStateData.length])
    return (
        <>
            <HeroSection title='Admin -Create User' />
            <div className="container-fluid my-3 ">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9">
                        <div className="bg-primary text-light text-center p-2">User <Link to='/admin/user' ><i className='fa fa-arrow-left text-light float-end'></i></Link></div>
                        <form onSubmit={postData}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label >Name*</label>
                                    <input type="text" placeholder='Full Name' name='name' onChange={getInputData} className={`form-control border-3 ${show && error.name ? 'border-danger' : 'border-primary'}`} />
                                    {show && error.name ? <p className='text-danger'>{error.name}</p> : null}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label >Phone*</label>
                                    <input type="text" placeholder='Phone' name='phone' onChange={getInputData} className={`form-control border-3 ${show && error.phone ? 'border-danger' : 'border-primary'}`} />
                                    {show && error.phone ? <p className='text-danger'>{error.phone}</p> : null}
                                </div>

                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label >UserName*</label>
                                    <input type="text" placeholder='Username' name='username' onChange={getInputData} className={`form-control border-3 ${show && error.username ? 'border-danger' : 'border-primary'}`} />
                                    {show && error.username ? <p className='text-danger'>{error.username}</p> : null}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label >Email*</label>
                                    <input type="email" placeholder='Email Address' name='email' onChange={getInputData} className={`form-control border-3 ${show && error.email ? 'border-danger' : 'border-primary'}`} />
                                    {show && error.email ? <p className='text-danger'>{error.email}</p> : null}
                                </div>

                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label >Password*</label>
                                    <input type="password" placeholder='Enter the Password' name='password' onChange={getInputData} className={`form-control border-3 ${show && error.password ? 'border-danger' : 'border-primary'}`} />
                                    {show && error.password ? <p className='text-danger'>{error.password}</p> : null}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label >Confirm Password*</label>
                                    <input type="password" placeholder='Comfirm Password' name='cpassword' onChange={getInputData} className={`form-control border-3 ${show && error.password ? 'border-danger' : 'border-primary'}`} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <select name="role" onChange={getInputData} className='form-select border-3 border-primary' >
                                        <option value="Admin">Admin</option>
                                        <option value="Super Admin">Super Admin</option>
                                    </select>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <select name="active" onChange={getInputData} className='form-select border-3 border-primary' >
                                        <option value="0">Yes</option>
                                        <option value="1">No</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mb-3">
                                <button type='submit' className='btn btn-primary w-100'>Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
