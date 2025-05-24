import React, { useState } from 'react'
import HeroSection from '../Components/HeroSection'

import { Link, useNavigate } from 'react-router-dom'

export default function LoginPage() {
    let [data, setData] = useState({
       
        username: "",
       
        
        password: "",
      
    })
    let [errorMessage, setErrorMessage] = useState()

    let [show, setShow] = useState(false)
    let navigate = useNavigate()
    function getInputData(e) {
        let { name, value } = e.target
      
        setData((old) => {
            return {
                ...old,
                [name]: value
            }
        })
    }

    async function postData(e) {
        e.preventDefault()
        setErrorMessage("")
        try {
            let response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/user`, {
                method: "GET",
                headers: {
                    "content-type": "application/json"
                }
            })
            response = await response.json()
            let item = response.find(x=>( x.username === data.username || x.email === data.username)&&x.password===data.password)
           if(item && item.active === false){
            setErrorMessage("Your Accout is not Active. Please Contact Us for More Details and to Active Your Account Please Provide your Usrname or Registered Email Address in Contact Us Query")
           }
            else if (item) {
                
                localStorage.setItem("login", true)
                    localStorage.setItem("name", item.name)
                    localStorage.setItem("useid", item.id)
                    localStorage.setItem("role", item.role)
                    if(item.role==='Buyer')
                    navigate("/profile")
                    else
                    navigate("/admin")
            } else {
               setErrorMessage("Invalid Username or Password")
              
            }
           } catch (error) {
            alert('Internal Server Error')
           }



    }

    return (
        <>
            <HeroSection title="Login - Login to Your Account" />
            <div className="container-fluid my-3 mb-5">
                <div className="row">
                    <div className="col-md-6 col-sm-8 col-10 m-auto">
                        <h5 className='bg-primary text-light text-center p-2'>Login to Your Account</h5>
                        <form onSubmit={postData}>
                            
                            
                                <div className="mb-3">
                                    <label >UserName*</label>
                                    <input type="text" placeholder='Username and Email Address' name='username' onChange={getInputData} className={`form-control border-3 ${errorMessage ? 'border-danger' : 'border-primary'}`} />
                                    { errorMessage ? <p className='text-danger'>{errorMessage}</p> : null}
                                </div>
                               

                            
                            
                                <div className="mb-3">
                                    <label >Password*</label>
                                    <input type="password" placeholder='Enter the Password' name='password' onChange={getInputData} className={`form-control border-3 ${errorMessage ? 'border-danger' : 'border-primary'}`} />
                                    
                              
                                

                            </div>
                            <div className="mb-3">
                                <button type='submit' className='btn btn-primary w-100'>Login</button>
                            </div>
                        </form>
                        <div className="mb-3 d-flex justify-content-between">
                            <Link to="#">Forget Account</Link>
                            <Link to="/signup">Doesn't Have an Account?Signup</Link>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
