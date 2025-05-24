import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import HeroSection from '../../../Components/HeroSection'
import AdminSidebar from '../../../Components/AdminSidebar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import formValidator from '../../../FormValidators/formValidator'
import imageValidator from '../../../FormValidators/imageValidator'

import { getTestimonial, updateTestimonial } from '../../../Redux/ActionCreartors/TestimonialActionCreators'
export default function AdminUpdateTestimonial() {
    let { id } = useParams()
    // let { _id } = useParams()


    let [data, setData] = useState({
        name: "",
        pic: "",
        message:"",
        active: true
    })
    let [error, setError] = useState({
        name: "",
        pic: "",
        message:""
    })
    let [show, setShow] = useState(false)
    let navigate = useNavigate()
    let TestimonialStateData = useSelector(state => state.TestimonialStateData)
    let dispatch = useDispatch()
    function getInputData(e) {
        let name = e.target.name
        // let value = e.target.files ?  e.target.files[0].name : e.target.value

        let value = e.target.files ? "testimonial/" + e.target.files[0].name : e.target.value
        if (name !== "active") {
            setError((old) => {
                return {
                    ...old,
                    [name]: e.target.files ? imageValidator(e) : formValidator(e)
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
    async function postSubmit(e) {
        e.preventDefault()
        let errorItem = Object.values(error).find(x => x !== "")
        if (errorItem) {
            setShow(true)
        } else  {

                 //in case of real backend and form has a file field

                //    let formData = new FormData()
                //    formData.append("_id",data._id)   //use id in case of RDBMS and use _id in case of mongodb
                //    formData.append("name",data.name)
                //    formData.append("pic",data.pic)
                //    formData.append("active",data.active)
                //    dispatch(createTestimonial(formData))


                dispatch(updateTestimonial({ ...data }))
                navigate("/admin/testimonial")



            }

        

    }

    useEffect(() => {
        (() => {

            dispatch(getTestimonial())
            if (TestimonialStateData.length) {
                let item = TestimonialStateData.find(x => x.id === id)
                // let item = TestimonialStateData.find(x => x._id === _id)

                if (item)
                    setData({ ...item })
            }

        })()
    }, [])
    return (
        <>
            <HeroSection title='Admin - Testimonial' />
            <div className="container-fluid my-3 ">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9">
                        <div className="bg-primary text-light text-center p-2">Testimonial <Link to='/admin/testimonial' ><i className='fa fa-arrow-left text-light float-end'></i></Link></div>
                        <form onSubmit={postSubmit}>
                            <div className="mb-3">
                                <label >Name</label>
                                <input type="text" name='name' value={data.name} placeholder='Testimonial Name' onChange={getInputData} className={`form-control border-3 ${show && error.name ? 'border-danger' : 'border-primary'}`} />
                                {show && error.name ? <p className='text-danger text-capitalize'>{error.name}</p> : null}
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label >Pic*</label>
                                    <input type="file" name='pic' onChange={getInputData} className={`form-control border-3 ${show && error.pic ? 'border-danger' : 'border-primary'}`} />
                                    {show && error.pic ? <p className='text-danger text-capitalize'>{error.pic}</p> : null}
                                </div>

                                <div className="mb-3">
                                <label>Message*</label>
                                <textarea name='message' value={data.message} placeholder='Message...' rows={5} onChange={getInputData} className={`form-control border-3 ${show && error.name ? 'border-danger' : 'border-primary'}`} ></textarea>
                                {show && error.message ? <p className='text-danger text-capitalize'>{error.message}</p> : null}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label >Active</label>
                                    <select name='active' value={data.active ? "1" : "0"} onChange={getInputData} className='form-select border-3 border-primary'>
                                        <option value="1">Yes</option>
                                        <option value="0">No</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mb-3">
                                <button type='submit' className='btn btn-primary w-100' >Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
