import React, {  useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, EffectCards } from 'swiper/modules';
import { Link, useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/effect-cards';
import 'swiper/css/pagination';


export default function CategorySlider({title,data}) {
    let [slidesPerView,setSlidesPerView] = useState(window.innerWidth <1000 ? 1: 3)
    let [slideType,setSlidetype] = useState(window.innerWidth <1000 ? 'cards':'coverflow')
   
    let navigate = useNavigate()
    let options = {
        effect:slideType,
        gradCursor:true,
        centeredSlides:false,
        slidesPerView:slidesPerView,
        coverflowEffect:{
            rotate:50,
            stretch:0,
            depth:100,
            modifier:1,
            slideShadows:true
        },
        loop:true,
        pagination:false,
        modules:[EffectCoverflow,Pagination,EffectCards],
        className:"mySwiper"
    }

    function handelWindowResize(){
        setSlidesPerView(window.innerWidth<1000? 'cards' : 'coverflow')
        navigate(0)
    }
    window.addEventListener("resize",handelWindowResize);
    
   
    return (

        <>
            <div className="Maincategory py-5 mb-5">
                <div className="container">
                    <div className="text-center mx-auto pb-5 wow fadeIn" data-wow-delay=".3s" style={{ maxWidth: "600px" }}>
                        <h5 className="text-primary">Our {title}</h5>
                        <h3>Our Deals in Following</h3>
                    </div>
                    <Swiper {...options}>
                        
                          {data?.map(item=>{
                            return   <SwiperSlide key={item.id}>
                           <div className="slider-container">
                            <img src={`${process.env.REACT_APP_BACKEND_SERVER}/${item.pic}`} style={{height:400}} className='w-100' alt="" />

                            <div className='slider-card-elements'>
                                <h4 >{item.name}</h4>
                                <Link to={title==="Maincategory"?`/shop?mc=${item.name}`: title==="Subcategory"?`/shop?sc=${item.name}`:`/shop?br=${item.name}`} className='btn btn-secondary text-light border-2 border-primary' >SHOP NOW</Link>
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
