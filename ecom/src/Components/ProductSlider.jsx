import React from 'react'


import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';

export default function ProductSlider({title,data}) {
    return (
        <>
            <div className="container-fluid py-5 mb-5 team">
                <div className="container">
                    <div className="text-center mx-auto pb-5 wow fadeIn" data-wow-delay=".3s" style={{ maxWidth: "600px" }}>
                        <h5 className="text-primary">{title?title: `Our Latest Product`}</h5>
                         <h1>Chechout Our { title?title:`Latest Product`} of Top Brands</h1>
                    </div>
                    <Swiper
                        loop={true}
                        autoplay={{
                            delay: 2000,
                            disableOnInteraction: false,
                        }}
                        centeredSlides={true}
                        pagination={false}
                        modules={[Pagination, Autoplay]}
                        className="mySwiper"
                        breakpoints={{
                            320: {
                                slidesPerView: 1,
                                spaceBetween: 10
                            },
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 20
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 30
                            }
                        }}
                    >
                        {data?.map((item)=>{
                            return  <SwiperSlide key={item.id}>
                            <div className="rounded team-item">
                                <div className="team-content">
                                    <div className="team-img-icon">
                                        <div className="team-img rounded-circle">
                                            <img src={`${process.env.REACT_APP_BACKEND_SERVER}/${item.pic[0]}`} style={{height:300}} className="img-fluid w-100 rounded-circle" alt="" />
                                        </div>
                                        <div className="team-name text-center py-3">
                                            <h4 className="">{item.name}</h4>
                                            <p className="m-0"><del>&#8377;{item.basePrice}</del> &#8377;{item.finalPrice}<sup>{item.discount}</sup> </p>
                                        </div>
                                        <div className="team-icon d-flex justify-content-center pb-4">
                                            <Link className="btn btn-secondary text-white m-1" to={`/product/${item.id}`}><i className="fa fa-shopping-cart"></i>&nbsp;Add to Card</Link>
                                             </div>
                                    </div>
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
