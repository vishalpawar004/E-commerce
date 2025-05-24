import React, { useEffect} from 'react'
import HeroSection from '../../../Components/HeroSection'
import AdminSidebar from '../../../Components/AdminSidebar'
import { useDispatch, useSelector } from 'react-redux'

import { Link } from 'react-router-dom'

import $ from 'jquery'
import 'datatables.net-dt/css/dataTables.dataTables.min.css'
import 'datatables.net';
import { deleteMaincategory, getMaincategory } from '../../../Redux/ActionCreartors/MaincategoryActionCreators'
export default function AdminMaincategory() {
   let MaincategoryStateData = useSelector(state=>state.MaincategoryStateData)
   let dispatch = useDispatch()
    // id convert in '_id' in backend real api
    function deleteRecord(id){
        if(window.confirm("Are you sure to delete that item")){
            dispatch(deleteMaincategory({id:id}))
            getAPIData()
        }

}
  function getAPIData(){
        dispatch(getMaincategory())
        let time = setTimeout(()=>{
            $('#DataTable').DataTable()
        },500)
        return time
    }

    useEffect(()=>{
        let time = getAPIData()
        return ()=>clearTimeout(time)
    
    },[MaincategoryStateData.length])
    return (
        <>
            <HeroSection title='Admin - Maincategory' />
            <div className="container-fluid py-3 mb-3 ">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9">
                    <div className="bg-primary text-light text-center p-2">Maincategory <Link to='/admin/maincategory/create' ><i className='fa fa-plus text-light float-end'></i></Link></div>
                   <div className="table-responsive">
                   <table id='DataTable' className='table table-bordered '>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Pic</th>
                                <th>Active</th>
                                <th>Update</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                MaincategoryStateData.map((item)=>{
                                    return <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>
                                            <Link to={`${process.env.REACT_APP_BACKEND_SERVER}/${item.pic}`} target='_blank'rel='noreferrer'>
                                            <img src={`${process.env.REACT_APP_BACKEND_SERVER}/${item.pic}`} alt="" height={50} width={80} />
                                            </Link>
                                        </td>
                                        <td className={`${item.active? 'text-success':'text-danger' }`}>{item.active?"Yes":"No"}</td>
                                        <td>
                                            <Link to={`/admin/maincategory/update/${item.id}`} className='btn btn-primary'><i className='fa fa-edit fs-5'></i></Link>
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
