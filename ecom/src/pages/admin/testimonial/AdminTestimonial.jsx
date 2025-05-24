import React, { useEffect } from 'react'
import HeroSection from '../../../Components/HeroSection'
import AdminSidebar from '../../../Components/AdminSidebar'
import { useDispatch, useSelector } from 'react-redux'

import { Link } from 'react-router-dom'

import $ from 'jquery'
import 'datatables.net-dt/css/dataTables.dataTables.min.css'
import 'datatables.net';
import { deleteTestimonial, getTestimonial } from '../../../Redux/ActionCreartors/TestimonialActionCreators'
export default function AdminTestimonial() {
    let TestimonialStateData = useSelector(state => state.TestimonialStateData)
    let dispatch = useDispatch()
    // id convert in '_id' in backend real api
    function deleteRecord(id) {
        if (window.confirm("Are you sure to delete that item")) {
            dispatch(deleteTestimonial({ id: id }))
            getAPIData()
        }

    }
    function getAPIData() {
        dispatch(getTestimonial())
        let time = setTimeout(() => {
            $('#DataTable').DataTable()
        }, 500)
        return time
    }

    useEffect(() => {
        let time = getAPIData()
        return () => clearTimeout(time)

    }, [TestimonialStateData.length])
    return (
        <>
            <HeroSection title='Admin - Testimonial' />
            <div className="container-fluid py-3 mb-3 ">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9">
                        <div className="bg-primary text-light text-center p-2">Testimonial <Link to='/admin/testimonial/create' ><i className='fa fa-plus text-light float-end'></i></Link></div>
                        <div className="table-responsive">
                            <table id='DataTable' className='table table-bordered '>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>Pic</th>
                                        <th>Message</th>
                                        <th>Active</th>
                                        <th>Update</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        TestimonialStateData.map((item) => {
                                            return <tr key={item.id}>
                                                <td>{item.id}</td>
                                                <td>{item.name}</td>

                                                <td>
                                                    <Link to={`${process.env.REACT_APP_BACKEND_SERVER}/${item.pic}`} target='_blank' rel='noreferrer'>
                                                        <img src={`${process.env.REACT_APP_BACKEND_SERVER}/${item.pic}`} alt="" height={50} width={80} />
                                                    </Link>
                                                </td>

                                                <td ><div className="testimonial-message">{item.message}</div>
                                                </td>
                                                <td className={`${item.active ? 'text-success' : 'text-danger'}`}>{item.active ? "Yes" : "No"}</td>
                                                <td>
                                                    <Link to={`/admin/testimonial/update/${item.id}`} className='btn btn-primary'><i className='fa fa-edit fs-5'></i></Link>
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
