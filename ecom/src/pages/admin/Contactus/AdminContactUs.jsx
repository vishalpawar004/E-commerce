import React, { useEffect } from 'react'
import HeroSection from '../../../Components/HeroSection'
import AdminSidebar from '../../../Components/AdminSidebar'
import { useDispatch, useSelector } from 'react-redux'

import { Link } from 'react-router-dom'

import $ from 'jquery'
import 'datatables.net-dt/css/dataTables.dataTables.min.css'
import 'datatables.net';
import { deleteContactUs, getContactUs, updateContactUs } from '../../../Redux/ActionCreartors/ContactUsActionCreators'
export default function AdminContactUs() {
    let ContactUsStateData = useSelector(state => state.ContactUsStateData)
    let dispatch = useDispatch()
    // id convert in '_id' in backend real api
    function deleteRecord(id) {
        if (window.confirm("Are you sure to delete that item")) {
            dispatch(deleteContactUs({ id: id }))
            getAPIData()
        }

    }

    function updateRecord(id) {
        if (window.confirm("Are you sure to update that item")) {
            let item = ContactUsStateData.find(x => x.id === id)
            dispatch(updateContactUs({ ...item,active:!item.active}))
            getAPIData()
        }
    }
    function getAPIData() {
        dispatch(getContactUs())
        let time = setTimeout(() => {
            $('#DataTable').DataTable()
        }, 500)
        return time
    }

    useEffect(() => {
        let time = getAPIData()
        return () => clearTimeout(time)

    }, [ContactUsStateData.length])
    return (
        <>
            <HeroSection title='Admin - ContactUs' />
            <div className="container-fluid py-3 mb-3 ">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9">
                        <div className="bg-primary text-light text-center p-2">ContactUs <Link to='/admin/contactus/create' ><i className='fa fa-plus text-light float-end'></i></Link></div>
                        <div className="table-responsive">
                            <table id='DataTable' className='table table-bordered '>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Subject</th>
                                        <th>Date</th>
                                        <th>Active</th>
                                        <th>Show</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        ContactUsStateData.map((item) => {
                                            return <tr key={item.id}>
                                                <td>{item.id}</td>
                                                <td>{item.name}</td>
                                                <td>{item.email}</td>
                                                <td>{item.phone}</td>
                                                <td>{item.subject}</td>
                                                <td>{new Date(item.date).toLocaleString()}</td>
                                                <td className={`${item.active ? 'text-success' : 'text-danger'}`} onClick={()=>updateRecord(item.id)} style={{cursor:"pointer"}} >{item.active ? "Yes" : "No"}</td>
                                                <td><Link to={`show/${item.id}`} className='btn btn-primary' ><i className='fa fa-eye'></i></Link></td>
                                                <td>
                                                    {
                                                        !item.active && localStorage.getItem("role")==="Super Admin" ?<button className='btn btn-danger' onClick={() => deleteRecord(item.id)}><i className='fa fa-trash fs-5'></i></button>:null
                                                    }
                                                </td>
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
