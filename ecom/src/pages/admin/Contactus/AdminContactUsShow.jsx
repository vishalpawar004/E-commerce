import React, { useEffect, useState } from 'react'
import HeroSection from '../../../Components/HeroSection'
import AdminSidebar from '../../../Components/AdminSidebar'
import { useDispatch, useSelector } from 'react-redux'

import { useNavigate, useParams } from 'react-router-dom'

import { deleteContactUs, getContactUs, updateContactUs } from '../../../Redux/ActionCreartors/ContactUsActionCreators'
export default function AdminContactUsShow() {
    let { id } = useParams()
    let [data, setData] = useState({})
    let [flag,setFlag] = useState(true)
    let ContactUsStateData = useSelector(state => state.ContactUsStateData)
    let dispatch = useDispatch()
    let navigate = useNavigate()
    // id convert in '_id' in backend real api
    function deleteRecord() {
        if (window.confirm("Are you sure to delete that item")) {
            dispatch(deleteContactUs({ id: id }))
            navigate("/admin/contactus")
        }
    }

    function updateRecord() {
        if (window.confirm("Are you sure to update that item")) {
            dispatch(updateContactUs({ ...data, active: !data.active }))
            data.active = !data.active
            setFlag(!flag)
        }
    }


    useEffect(() => {
        (() => {
            dispatch(getContactUs())
            if (ContactUsStateData.length) {
                let item = ContactUsStateData.find(x => x.id === id)
                if (item)
                    setData({ ...item })
                else
                    alert("Invalid Contact Us Id")
            }
        })()

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
                        <h5 className="bg-primary text-light text-center p-2">ContactUs Query</h5>
                        <table className='table table-bordered'>
                            <tbody>
                                <tr>
                                    <th>Id</th>
                                    <td>{data.id}</td>
                                </tr>
                                <tr>
                                    <th>Name</th>
                                    <td>{data.name}</td>
                                </tr><tr>
                                    <th>Email</th>
                                    <td>{data.email}</td>
                                </tr>
                                <tr>
                                    <th>Phone</th>
                                    <td>{data.phone}</td>
                                </tr>
                                <tr>
                                    <th>Subject</th>
                                    <td>{data.subject}</td>
                                </tr>
                                <tr>
                                    <th>Message</th>
                                    <td>{data.message}</td>
                                </tr>
                                <tr>
                                    <th>Date</th>
                                    <td>{new Date(data.date).toLocaleString()}</td>
                                </tr>
                                <tr>
                                    <th>Active</th>
                                    <td>{data.active ? "Yes" : "No"}</td>
                                </tr>
                                <tr >
                                    <td colSpan={2}>
                                        {
                                            data.active ?
                                                <button className='btn btn-primary w-100' onClick={updateRecord}>Update Status</button> :
                                                <button className='btn btn-danger w-100' onClick={deleteRecord}>Delete</button>
                                        }
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
