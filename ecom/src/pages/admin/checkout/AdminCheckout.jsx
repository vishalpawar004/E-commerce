import React, { useEffect } from 'react'
import HeroSection from '../../../Components/HeroSection'
import AdminSidebar from '../../../Components/AdminSidebar'
import { useDispatch, useSelector } from 'react-redux'

import { Link } from 'react-router-dom'

import $ from 'jquery'
import 'datatables.net-dt/css/dataTables.dataTables.min.css'
import 'datatables.net';
import {  getCheckout } from '../../../Redux/ActionCreartors/CheckoutActionCreators'
export default function AdminCheckout() {
    let CheckoutStateData = useSelector(state => state.CheckoutStateData)
    let dispatch = useDispatch()
    // id convert in '_id' in backend real api
   
    function getAPIData() {
        dispatch(getCheckout())
        let time = setTimeout(() => {
            $('#DataTable').DataTable()
        }, 500)
        return time
    }

    useEffect(() => {
        let time = getAPIData()
        return () => clearTimeout(time)

    }, [CheckoutStateData.length])
    return (
        <>
            <HeroSection title='Admin - Checkout' />
            <div className="container-fluid py-3 mb-3 ">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9">
                        <div className="bg-primary text-light text-center p-2">Checkout <Link to='/admin/checkout/create' ><i className='fa fa-plus text-light float-end'></i></Link></div>
                        <div className="table-responsive">
                            <table id='DataTable' className='table table-bordered '>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>UserId</th>
                                        <th>Date</th>
                                        <th>Subtotal</th>
                                        <th>Shipping</th>
                                        <th>Total</th>
                                        <th>Order Status</th>
                                        <th>Payment Mode</th>
                                        <th>Payment Status</th>
                                        
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        CheckoutStateData.map((item) => {
                                            return <tr key={item.id}>
                                                <td>{item.id}</td>
                                                <td>{item.user}</td>
                                                <td>{new Date(item.date).toLocaleString()}</td>
                                                <td>{item.subtotal}</td>
                                                <td>{item.shipping}</td>
                                                <td>{item.total}</td>
                                                <td>{item.orderStatus}</td>
                                                <td>{item.paymentMode}</td>
                                                <td>{item.paymentStatus}</td>
                                                {/* <td className={`${item.active ? 'text-success' : 'text-danger'}`} onClick={()=>updateRecord(item.id)} style={{cursor:"pointer"}} >{item.active ? "Yes" : "No"}</td> */}
                                                <td><Link to={`show/${item.id}`} className='btn btn-primary' ><i className='fa fa-eye'></i></Link></td>
                                                {/* <td>
                                                    { item.active?null:<button className='btn btn-danger' onClick={() => deleteRecord(item.id)}><i className='fa fa-trash fs-5'></i></button>}</td> */}
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
