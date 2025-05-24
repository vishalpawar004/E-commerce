import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay, Pagination, EffectCards } from 'swiper/modules';
import { getTestimonial } from '../Redux/ActionCreartors/TestimonialActionCreators'
import { useDispatch, useSelector } from 'react-redux';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/effect-cards';
import 'swiper/css/pagination';
import { useNavigate } from 'react-router-dom';


export default function Testimonial() {
    let [slidesPerView, setSlidesPerView] = useState(window.innerWidth < 1000 ? 1 : 3)
    let [slideType, setSlidetype] = useState(window.innerWidth < 1000 ? 'cards' : 'coverflow')
    let TestimonialStateData = useSelector(state => state.TestimonialStateData)
    let navigate = useNavigate()
    let options = {
        effect: slideType,
        gradCursor: true,
        centeredSlides: false,
        slidesPerView: slidesPerView,
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true
        },
        loop: true,
        pagination: true,
        modules: [EffectCoverflow, Pagination, EffectCards],
        className: "mySwiper"
    }

    function handelWindowResize() {
        setSlidesPerView(window.innerWidth < 1000 ? 'cards' : 'coverflow')
        navigate(0)
    }
    window.addEventListener("resize", handelWindowResize);
     TestimonialStateData = useSelector(state => state.TestimonialStateData)
    let disptch = useDispatch()
    useEffect(() => {
        (() => {
            disptch(getTestimonial())
        })()
    }, [TestimonialStateData.length])
    return (

        <>
            <div className="testimonial py-5 mb-5">
                <div className="container">
                    <div className="text-center mx-auto pb-5 wow fadeIn" data-wow-delay=".3s" style={{ maxWidth: "600px" }}>
                        <h5 className="text-primary">Our Testimonial</h5>
                        <h1>Our Client Saying!</h1>
                    </div>
                    <Swiper {...options}>

                        {TestimonialStateData.length && TestimonialStateData.filter(x => x.active).map(item => {
                            return <SwiperSlide key={item.id}>
                                <div className="testimonial-item border p-4 ">
                                    <div className="d-flex align-items-center">
                                        <div className="">
                                            <img src={`${process.env.REACT_APP_BACKEND_SERVER}/${item.pic}`} style={{ height: 120 }} alt="" />
                                        </div>
                                        <div className="ms-4">
                                            <h4 className="text-secondary">{item.name}</h4>

                                            <div className="d-flex pe-5">
                                                <i className="fas fa-star me-1 text-primary"></i>
                                                <i className="fas fa-star me-1 text-primary"></i>
                                                <i className="fas fa-star me-1 text-primary"></i>
                                                <i className="fas fa-star me-1 text-primary"></i>
                                                <i className="fas fa-star me-1 text-primary"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border-top mt-4 pt-3">
                                        <p className="mb-0 w-100 text-dark testimonial-message " > {item.message}</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        })}


                    </Swiper>
                </div>
            </div>
        </>
    )
}
