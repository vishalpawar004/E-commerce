import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Profile({ title }) {
    let [data,setData] = useState({})
    useEffect(()=>{
        (async()=>{
            let response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/user/${localStorage.getItem('useid')}`, {
                method: "GET",
                headers: {
                    "content-type": "application/json"
                }
            })
            response = await response.json()
            setData(response)
        })()
    },[])
    return (
        <>
            <h5 className='bg-primary text-light text-center p-2'>{title==='Checkout'?"Billing Address":`${title}`} Profile</h5>
            <div className="row">
                {
                    title !== "Checkout" && <div className="col-md-6 mb-5">
                    <img src={`${process.env.REACT_APP_BACKEND_SERVER}/${data.pic}`} height={450} width={"100%"} alt="" />
                </div>
                }
                <div className={`${title === 'Checkout'?'col-12':'col-md-6'} mb-12`}>
                    <table className='table table-bordered'>
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <td>{data.name}</td>

                            </tr>
                            <tr>
                                <th>User Name</th>
                                <td>{data.username}</td>
                            </tr>
                            <tr>
                                <th>Email Address</th>
                                <td>{data.email}</td>
                            </tr>
                            <tr>
                                <th>Phone</th>
                                <td>{data.phone}</td>
                            </tr>
                            {
                                title !== 'Admin' ? <>
                                    <tr>
                                        <th>Address</th>
                                        <td>{data.address}</td>
                                    </tr>
                                    <tr>
                                        <th>City</th>
                                        <td>{data.city}</td>
                                    </tr>
                                    <tr>
                                        <th>State</th>
                                        <td>{data.state}</td>
                                    </tr>
                                    <tr>
                                        <th>Pin</th>
                                        <td>{data.pin}</td>
                                    </tr>

                                </> : null
                            }
                            <tr>
                                <td colSpan={2}>
                                    <Link to='/update-profile' className='btn btn-primary w-100' >Update Profile</Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    )
}
