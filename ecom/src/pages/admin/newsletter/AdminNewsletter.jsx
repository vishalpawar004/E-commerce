import React, { useEffect } from 'react'
import HeroSection from '../../../Components/HeroSection'
import AdminSidebar from '../../../Components/AdminSidebar'
import { useDispatch, useSelector } from 'react-redux'

import { Link } from 'react-router-dom'

import $ from 'jquery'
import 'datatables.net-dt/css/dataTables.dataTables.min.css'
import 'datatables.net';
import { deleteNewsletter, getNewsletter, updateNewsletter } from '../../../Redux/ActionCreartors/NewsletterActionCreators'
export default function AdminNewsletter() {
    let NewsletterStateData = useSelector(state => state.NewsletterStateData)
    let dispatch = useDispatch()
    // id convert in '_id' in backend real api
    function deleteRecord(id) {
        if (window.confirm("Are you sure to delete that item")) {
            dispatch(deleteNewsletter({ id: id }))
            getAPIData()
        }

    }

    function updateRecord(id) {
        if (window.confirm("Are you sure to update that item")) {
            let item = NewsletterStateData.find(x => x.id === id)
            dispatch(updateNewsletter({ ...item,active:!item.active}))
            getAPIData()
        }
    }
    function getAPIData() {
        dispatch(getNewsletter())
        let time = setTimeout(() => {
            $('#DataTable').DataTable()
        }, 500)
        return time
    }

    useEffect(() => {
        let time = getAPIData()
        return () => clearTimeout(time)

    }, [NewsletterStateData.length])
    return (
        <>
            <HeroSection title='Admin - Newsletter' />
            <div className="container-fluid py-3 mb-3 ">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9">
                        <div className="bg-primary text-light text-center p-2">Newsletter <Link to='/admin/newsletter/create' ><i className='fa fa-plus text-light float-end'></i></Link></div>
                        <div className="table-responsive">
                            <table id='DataTable' className='table table-bordered '>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Email</th>
                                        <th>Active</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        NewsletterStateData.map((item) => {
                                            return <tr key={item.id}>
                                                <td>{item.id}</td>
                                                <td>{item.email}</td>
                                                <td className={`${item.active ? 'text-success' : 'text-danger'}`} onClick={()=>updateRecord(item.id)} style={{cursor:"pointer"}} >{item.active ? "Yes" : "No"}</td>
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
