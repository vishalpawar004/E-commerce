import React from 'react'
import { Link } from 'react-router-dom'

export default function Product({ title, data }) {
    return (
        <>
            <div className="container-fluid project py-5 mb-5">
                <div className="container">
                   
                       {title !=="Shop" &&  <div className="text-center mx-auto pb-5 wow fadeIn" data-wow-delay=".3s" style={{ maxWidth: "600px" }}>
                       <h5 className="text-primary">Our Product</h5>
                       <h1>For {title}</h1>
                       </div>}
                       
                    </div>
                    <div className="row g-5">
                        {data.map((item) => {
                            return <div key={item.id} className="col-md-6 col-lg-4 wow fadeIn" data-wow-delay=".3s">
                                <div className="project-item">
                                    <div className="project-img">
                                        <img src={`${process.env.REACT_APP_BACKEND_SERVER}/${item.pic[0]}`} style={{ height:450,width:'500px' }} className="img-fluid rounded" alt="" />
                                        <div className="project-content">
                                            <Link to={`/product/${item.id}`} className="text-center">
                                                <h5 className="text-secondary">{item.name}</h5>
                                                <p className="m-0 text-white"><del>&#8377;{item.basePrice}</del> &nbsp;&#8377;{item.finalPrice}<sup>{item.discount}%Off</sup></p>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        })}

                    </div>
                </div>
          
        </>
    )
}
