import React, { useEffect, useState } from 'react'
import HeroSection from '../../../Components/HeroSection'
import AdminSidebar from '../../../Components/AdminSidebar'


import { Link } from 'react-router-dom'

import $ from 'jquery'
import 'datatables.net-dt/css/dataTables.dataTables.min.css'
import 'datatables.net';

export default function AdminUser() {
    let [UserStateData, setUserStateData] = useState([])

    // id convert in '_id' in backend real api
    async function deleteRecord(id) {
        if (window.confirm("Are you sure to delete that item")) {
            let response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/user/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        "content-type": "application/json"
                    }
                })
            response = await response.json()
            getAPIData()
        }

    }

        async function updateRecord(id) {
            if (window.confirm("Are you sure to update that item")) {
                let item = UserStateData.find(x => x.id === id)
                let response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/user/${id}`,
                    {
                        method: "PUT",
                        headers: {
                            "content-type": "application/json"
                        },
                        body : JSON.stringify({...item,active:!item.active})
                    })
                response = await response.json()
                getAPIData()
            }
            
        }
    async function getAPIData() {
        let response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/user`,
            {
                method: "GET",
                headers: {
                    "content-type": "application/json"
                }
            })
        response = await response.json()
        setUserStateData(response)

        let time = setTimeout(() => {
            $('#DataTable').DataTable()
        }, 500)
        return time
    }
    useEffect(() => {
        let time = getAPIData()
        return () => clearTimeout(time)

    }, [])
    return (
        <>
            <HeroSection title='Admin - User' />
            <div className="container-fluid py-3 mb-3 ">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9">
                        <div className="bg-primary text-light text-center p-2">User {localStorage.getItem("role")==="Super Admin"?<Link to='/admin/user/create' ><i className='fa fa-plus text-light float-end'></i></Link>:null}</div>
                        <div className="table-responsive">
                            <table id='DataTable' className='table table-bordered '>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>Username</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Role</th>

                                        <th>Active</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        UserStateData.map((item) => {
                                            return <tr key={item.id}>
                                                <td>{item.id}</td>
                                                <td>{item.name}</td>
                                                <td>{item.username}</td>
                                                <td>{item.email}</td>
                                                <td>{item.phone}</td>
                                                <td>{item.role}</td>
                                                <td className={`${item.active ? 'text-success' : 'text-danger'} `} onClick={()=>updateRecord(item.id)} style={{cursor:"pointer"}} >{item.active ? "Yes" : "No"}</td>
                                                <td>{localStorage.getItem("role")==="Super Admin" && item.role!=="Buyer" ?
                                                    <Link to={`/admin/user/update/${item.id}`} className='btn btn-primary'><i className='fa fa-edit fs-5'></i></Link>:null}
                                                </td>
                                                <td>{localStorage.getItem("role")==="Super Admin"? <button className='btn btn-danger' onClick={()=>deleteRecord(item.id)}><i className='fa fa-trash fs-5'></i></button>:null}</td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
