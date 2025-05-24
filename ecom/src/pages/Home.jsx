import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import CategorySlider from '../Components/CategorySlider'
import Facts from '../Components/Facts'
import About from '../Components/About'
import Features from '../Components/Features'
import Product from '../Components/Product'
import ProductSlider from '../Components/ProductSlider'
import Testimonial from '../Components/Testimonial'

import { Link } from 'react-router-dom'
import { getMaincategory } from '../Redux/ActionCreartors/MaincategoryActionCreators'
import { getSubcategory } from '../Redux/ActionCreartors/SubcategoryActionCreators'
import { getBrand } from '../Redux/ActionCreartors/BrandActionCreators'
import { getProduct } from '../Redux/ActionCreartors/ProductActionCreators'


export default function Home() {
    let ProductStateData = useSelector((state) => state.ProductStateData)
    let MaincategoryStateData = useSelector((state) => state.MaincategoryStateData)
    let SubcategoryStateData = useSelector((state) => state.SubcategoryStateData)
    let BrandStateData = useSelector((state) => state.BrandStateData)

    let disptch = useDispatch()

    useEffect(() => {
        (() => {
            disptch(getMaincategory())
        })()
    }, [MaincategoryStateData.length])

    useEffect(() => {
        (() => {
            disptch(getSubcategory())
        })()
    }, [SubcategoryStateData.length])

    useEffect(() => {
        (() => {
            disptch(getBrand())
        })()
    }, [BrandStateData.length])


    useEffect(() => {
        (() => {
            disptch(getProduct())
        })()
    }, [ProductStateData.length])

    return (
        <>
            <div className="container-fluid px-0">
                <div id="carouselId" className="carousel slide" data-bs-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-bs-target="#carouselId" data-bs-slide-to="0" className="active" aria-current="true" aria-label="First slide"></li>
                        <li data-bs-target="#carouselId" data-bs-slide-to="1" aria-label="Second slide"></li>
                        <li data-bs-target="#carouselId" data-bs-slide-to="2" aria-label="Third slide"></li>

                    </ol>
                    <div className="carousel-inner" role="listbox">
                        <div className="carousel-item active">
                            <img src="img/banner1.jpg" style={{ height: 800 }} className="w-100" alt="First slide" />
                            <div className="carousel-caption">
                                <div className="container carousel-content">
                                    <h6 className="text-secondary h4 animated fadeInUp">Best Online Shopping Plateform</h6>
                                    <h1 className="text-white display-5 mb-4 animated fadeInRight">We Deals in Top Brand Product For Male</h1>
                                    <Link to='/shop?mc=Male' className="me-2"><button type="button" className="px-4 py-sm-3 px-sm-5 btn btn-primary rounded-pill carousel-content-btn1 animated fadeInLeft">Shopping</button></Link>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img src="img/banner2.jpg" style={{ height: 800 }} className="w-100" alt="Second slide" />
                            <div className="carousel-caption">
                                <div className="container carousel-content">
                                    <h6 className="text-secondary h4 animated fadeInUp">Best Online Shopping Plateform</h6>
                                    <h1 className="text-white display-5 mb-4 animated fadeInLeft">We Deals in Top Brand Product For Female</h1>
                                    <Link to='/shop?mc=Female' className="me-2"><button type="button" className="px-4 py-sm-3 px-sm-5 btn btn-primary rounded-pill carousel-content-btn1 animated fadeInLeft">Shopping</button></Link>

                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img src="img/banner3.jpg" style={{ height: 800 }} className="w-100" alt="Third slide" />
                            <div className="carousel-caption">
                                <div className="container carousel-content">
                                    <h6 className="text-secondary h4 animated fadeInUp">Best Online Shopping Plateform</h6>
                                    <h1 className="text-white display-5 mb-4 animated fadeInLeft">We Deals in Top Brand Product For Kids</h1>
                                    <Link to='/shop?mc=Kids' className="me-2"><button type="button" className="px-4 py-sm-3 px-sm-5 btn btn-primary rounded-pill carousel-content-btn1 animated fadeInLeft">Shopping</button></Link>

                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselId" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselId" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>

            <Facts />
            <CategorySlider title="Maincategory" data={MaincategoryStateData.filter(x => x.active)} />
            <About title="Home" />
            <CategorySlider title="Subcategory" data={SubcategoryStateData} />

            <Features />

            {
                MaincategoryStateData.filter(x => x.active).map((item) => {
                return <Product title={item.name} data={ProductStateData.filter(x => x.active && x.maincategory === item.name).slice(0,12)} />
                })
            }


            <ProductSlider data={ProductStateData.filter(x => x.active)} />
            <CategorySlider title="Brand" data={BrandStateData.filter(x=>x.active)} />

            <Testimonial />

        </>
    )
}
