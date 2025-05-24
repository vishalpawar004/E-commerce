import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import HeroSection from '../../../Components/HeroSection'
import AdminSidebar from '../../../Components/AdminSidebar'


import formValidator from '../../../FormValidators/formValidator'
import imageValidator from '../../../FormValidators/imageValidator'
import { createProduct } from '../../../Redux/ActionCreartors/ProductActionCreators'
import { getBrand } from '../../../Redux/ActionCreartors/BrandActionCreators'
import { getMaincategory } from "../../../Redux/ActionCreartors/MaincategoryActionCreators"
import { getSubcategory } from "../../../Redux/ActionCreartors/SubcategoryActionCreators"

var rte;
export default function AdminCreateProduct() {
    var refdiv=useRef(null);
  
    let [data, setData] = useState({
        name: "",
        maincategory: "",
        subcategory: "",
        brand: "",
        color: "",
        size: "",
        basePrice: 0,
        discount: 0,
        finalPrize: 0,
        stock: true,
        stockQuantity: 0,
        description: "",
        pic: [],
        active: true
    })
    let [error, setError] = useState({
        name: "Name Field is Mendatory",
        color: "Color Field is Mendatory",
        size: "Size Field is Mendatory",
        basePrice: "Base Field is Mendatory",
        discount: "Discount Field is Mendatory",
        stockQuantity: "Stock Field is Mendatory",
        pic: "Pic Field is Mendatory",

    })
    let [show, setShow] = useState(false)
    let navigate = useNavigate()

    let MaincategoryStateData = useSelector((state) => state.MaincategoryStateData)
    let SubcategoryStateData = useSelector((state) => state.SubcategoryStateData)

    let BrandStateData = useSelector((state) => state.BrandStateData)

    let dispatch = useDispatch()


    function getInputData(e) {
        let name = e.target.name
        // let value = e.target.files ? e.target.files[0].name : e.target.value // in case of real backend
        let value = e.target.files ? Array.from(e.target.files).map(x=>"product/"+ x.name) : e.target.value

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
                [name]: name === "active" || name ==='stock' ? (value === "1" ? true : false) : value
            }


        })
    }
    function postSubmit(e) {
        e.preventDefault()
        let errorItem = Object.values(error).find(x => x !== "")
        if (errorItem) {
            setShow(true)
        } else {

            let bp = parseInt(data.basePrice)
            let d = parseInt(data.discount)
            let fp = parseInt(bp-bp*d/100)
            let stockQuantity = parseInt(data.stockQuantity)
            dispatch(createProduct({ ...data ,
                'maincategory': data.maincategory? data.maincategory : MaincategoryStateData[0].name,
                'subcategory': data.subcategory? data.subcategory : SubcategoryStateData[0].name,
                'brand': data.brand? data.brand : BrandStateData[0].name,
                'basePrice': bp,
                'finalPrice': fp,
                'stockQuantity': stockQuantity,
                'description': rte.getHTMLCode()


            }))

            //in case of real backend and form has a file field

            //    let formData = new FormData()
            //    formData.append("name",data.name)
            //    formData.append("pic",data.pic)
            //    formData.append("active",data.active)
            //    formData.append("message",data.message)

            //    dispatch(createProduct(formData))

            navigate("/admin/product")
        }

    }
    useEffect(()=>{
        rte=new window.RichTextEditor(refdiv.current);
        rte.setHTMLCode("");
    },[])

    useEffect(() => {
        (() => {
            dispatch(getMaincategory())
        })()
    }, [MaincategoryStateData.length])


    useEffect(() => {
        (() => {
            dispatch(getSubcategory())
        })()
    }, [SubcategoryStateData.length])


    useEffect(() => {
        (() => {
            dispatch(getBrand())
        })()
    }, [BrandStateData.length])


    return (
        <>
            <HeroSection title='Admin - Product' />
            <div className="container-fluid my-3 ">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9">
                        <div className="bg-primary text-light text-center p-2">Product <Link to='/admin/product' ><i className='fa fa-arrow-left text-light float-end'></i></Link></div>
                        <form onSubmit={postSubmit}>
                            <div className="mb-3">
                                <label >Name*</label>
                                <input type="text" name='name' placeholder='Product Name' onChange={getInputData} className={`form-control border-3 ${show && error.name ? 'border-danger' : 'border-primary'}`} />
                                {show && error.name ? <p className='text-danger text-capitalize'>{error.name}</p> : null}
                            </div>
                            <div className="row">

                                <div className="col-lg-3 col-md-3 mb-3">
                                    <label >Maincategory*</label>
                                    <select name="maincategory" onChange={getInputData} className='form-select border-3 border-primary' >
                                        {MaincategoryStateData && MaincategoryStateData.filter((x) => x.active).map((item) => {
                                            return <option key={item.id}>{item.name}</option>
                                            // return <option key={item._id} value={item._id}>{item.name}</option>


                                        })}
                                    </select>
                                </div>
                                <div className="col-lg-3 col-md-3 mb-3">
                                    <label >Subcategory*</label>
                                    <select name="subcategory" onChange={getInputData} className='form-select border-3 border-primary' id="">
                                        {SubcategoryStateData && SubcategoryStateData.filter((x) => x.active).map((item) => {
                                            return <option key={item.id}>{item.name}</option>
                                            // return <option key={item._id} value={item._id}>{item.name}</option>


                                        })}
                                    </select>
                                </div>
                                <div className="col-lg-3 col-md-3 mb-3">
                                    <label >Brand*</label>
                                    <select name="brand" onChange={getInputData} className='form-select border-3 border-primary' id="">
                                        {BrandStateData && BrandStateData.filter((x) => x.active).map((item) => {
                                            return <option key={item.id}>{item.name}</option>
                                            // return <option key={item._id} value={item._id}>{item.name}</option>


                                        })}
                                    </select>
                                </div>
                                <div className="col-lg-3 col-md-6 mb-3">
                                    <label >Active*</label>
                                    <select name='active' onChange={getInputData} className='form-select border-3 border-primary'>
                                        <option value="1">Yes</option>
                                        <option value="0">No</option>
                                    </select>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <label >Color*</label>
                                    <input type="text" name='color' placeholder='Product color' onChange={getInputData} className={`form-control border-3 ${show && error.name ? 'border-danger' : 'border-primary'}`} />
                                    {show && error.color ? <p className='text-danger text-capitalize'>{error.color}</p> : null}
                                </div>

                                <div className="col-md-6 mb-3">
                                <label >Size*</label>
                                    <input type="text" name='size' placeholder='Product Size' onChange={getInputData} className={`form-control border-3 ${show && error.name ? 'border-danger' : 'border-primary'}`} />
                                    {show && error.size ? <p className='text-danger text-capitalize'>{error.size}</p> : null}
                                
                                </div>

                                <div className="col-md-6 mb-3">
                                <label >Base Price*</label>
                                    <input type="number" name='basePrice' placeholder='Product Base Price' onChange={getInputData} className={`form-control border-3 ${show && error.name ? 'border-danger' : 'border-primary'}`} />
                                    {show && error.basePrice ? <p className='text-danger text-capitalize'>{error.basePrice}</p> : null}
                                
                                </div>
                                <div className="col-md-6 mb-3">
                                <label >Discount*</label>
                                    <input type="number" name='discount' placeholder='Product Discount' onChange={getInputData} className={`form-control border-3 ${show && error.name ? 'border-danger' : 'border-primary'}`} />
                                    {show && error.discount ? <p className='text-danger text-capitalize'>{error.discount}</p> : null}

                                
                                </div>

                            </div>

                            <div className="mb-3">
                                <label>Descrption*</label>
                                <div ref={refdiv}></div>
                                {show && error.message ? <p className='text-danger text-capitalize'>{error.message}</p> : null}
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label >Pic*</label>
                                    <input type="file" name='pic' multiple onChange={getInputData} className={`form-control border-3 ${show && error.pic ? 'border-danger' : 'border-primary'}`} />
                                    {show && error.pic ? typeof error.pic === 'string' ? <p className='text-danger text-capitalize'>{error.pic}</p> 
                                    :error.pic.map((err,index)=>{
                                        return <p key={index} className='text-danger text-capitalize'>{err}</p>
                                    }):null}
                                </div>

                                <div className="col-md-6 mb-3">
                                <label >Stock Quantity*</label>
                                    <input type="number" name='stockQuantity' placeholder='Product stockQuantity' onChange={getInputData} className={`form-control border-3 ${show && error.name ? 'border-danger' : 'border-primary'}`} />
                                    {show && error.stockQuantity ? <p className='text-danger text-capitalize'>{error.stockQuantity}</p> : null}

                                
                                </div>

                            </div>
                            <div className="col-md-6 mb-3">
                                    <label >Active*</label>
                                    <select name='active' onChange={getInputData} className='form-select border-3 border-primary'>
                                        <option value="1">Yes</option>
                                        <option value="0">No</option>
                                    </select>
                                </div>
                            <div className="mb-5">
                                <button type='submit' className='btn btn-primary w-100' >Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
