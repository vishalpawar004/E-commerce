import React, { useEffect, useState } from 'react'
import { deleteCart, getCart, updateCart } from '../Redux/ActionCreartors/CartActionCreators'
import { useDispatch, useSelector } from 'react-redux'
import { createCheckout } from '../Redux/ActionCreartors/CheckoutActionCreators'
import { Link, useNavigate } from 'react-router-dom'
import { getProduct, updateProduct } from '../Redux/ActionCreartors/ProductActionCreators'

export default function Cart({ title, data }) {
    let [cart, setCart] = useState([])
    let [subtotal, setSubtotal] = useState(0)
    let [shipping, setShipping] = useState(0)
    let [total, setTotal] = useState(0)
    let [mode, setMode] = useState('COD')
    let CartStateData = useSelector((state) => state.CartStateData)
    let ProductStateData = useSelector((state) => state.ProductStateData)

    let dispatch = useDispatch()
    let navigate = useNavigate()

    function placeOrder() {
        let item = {
            user: localStorage.getItem("useid"),
            orderStatus: "Order is Placed ",
            paymentMode: mode,
            paymentStatus: "Pending",
            subtotal: subtotal,
            shipping: shipping,
            total: total,
            date: new Date(),
            products: [...cart]

        }
        dispatch(createCheckout(item))

        cart.forEach(item => {
            let product = ProductStateData.find(x => x.id === item.product)
            product.stockQuantity -= item.qty
            product.stock -= product.stockQuantity === 0 ? false : true
            dispatch(updateProduct(product))
            dispatch(deleteCart({ id: item.id }))
        })

        navigate("/confirmation")
    }
    function deleteRecord(id) {
        if (window.confirm("Are you Sure Delete that item from Cart:")) {
            dispatch(deleteCart({ id: id }))
            getAPIData()
        }
    }
    function calculate(data) {
        let subtotal = 0
        data.forEach(x => subtotal += x.total)
        if (subtotal > 0 && subtotal < 1000) {
            setShipping(150)
            setTotal(subtotal + 150)
        } else {
            setShipping(0)
            setTotal(subtotal)
        }
        setSubtotal(subtotal)
    }

    function updateRecord(id, option) {
        var item = cart.find(x => x.id === id)
        var index = cart.find(x => x.id === id)
        if (option === 'DEC' && item.qty === 1)
            return
        else if (option === 'DEC') {
            item.qty -= 1
            item.total -= item.price
        } else if (option === 'INC' && item.qty < item.stockQuantity) {
            item.qty += 1
            item.total += item.price
        }
        dispatch(updateCart({ ...item }))
        cart[index] = { ...item }
        calculate(cart)
    }
    function getAPIData() {
        dispatch(getCart())
        if (data) {
            setCart(data)
            calculate(data)
        }
        else if (CartStateData.length) {
            let data = CartStateData.filter(x => x.user === localStorage.getItem("useid"))
            setCart(data)
            calculate(data)
        }
        else {
            setCart([])
            calculate([])
        }

    }
    useEffect(() => {
        getAPIData()
    }, [CartStateData.length])
    useEffect(() => {
        (() => {
            dispatch(getProduct())
        })()
    }, [ProductStateData.length])

    return (

        <>
            <h5 className='bg-primary text-center text-light p-2' >{title === 'Cart' ? 'Cart Section' :data? "Order Items":"Item in Cart"}</h5>
            {
                cart.length ?
                    <>
                        <div className="table-responise ">
                            <table className='table table-bordered  '>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Name</th>
                                        <th>Brand</th>
                                        <th>Color</th>
                                        <th>Size</th>
                                        {title !== "Checkout" ? <th>Stock</th> : null}
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>total</th>
                                        {title !== "Checkout" ? <th></th> : null}
                                    </tr>

                                </thead>
                                <tbody>
                                    {
                                        cart.map((item) => {
                                            return <tr key={item.id}>
                                                <td>
                                                    <Link to={`${process.env.REACT_APP_BACKEND_SERVER}/${item.pic}`} target='_blank' rel='noreferrer'>
                                                        <img src={`${process.env.REACT_APP_BACKEND_SERVER}/${item.pic}`} width={80} height={50} alt="" />
                                                    </Link>

                                                </td>
                                                <td>{item.name}</td>
                                                <td>{item.brand}</td>
                                                <td>{item.color}</td>
                                                <td>{item.size}</td>
                                                <td>&#8377;{item.price}</td>
                                                {title !== 'Checkout' ? <td>{item.stockQuantity ? `${item.stockQuantity} Left in Stock ` : "Out of Stock"}</td> : null}
                                                <td>
                                                    <div className="d-flex" style={{ width: 150 }}>
                                                        {title !== 'Checkout' ? <button className='btn btn-primary w-25' onClick={() => updateRecord(item.id, "DEC")}><i className='fa fa-minus'></i></button> : null}
                                                        <h5 className='text-center mt-1' style={{ width: "40%" }}>{item.qty}</h5>
                                                        {title !== 'Checkout' ? <button className='btn btn-primary w-25' onClick={() => updateRecord(item.id, "INC")}><i className='fa fa-plus'></i></button> : null}
                                                    </div>
                                                </td>
                                                <td>&#8377;{item.total}</td>

                                                {title !== 'Checkout' ? <td> <button onClick={() => deleteRecord(item.id)} className='btn btn-danger'><i className='fa fa-trash'></i></button></td> : null}
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>

                        {!data && <div className="row">
                            <div className="col-md-6"></div>
                            <div className={`${title === 'Checkout' ? 'col-12' : 'col-md-6'} mb-12`}>
                                <table className='table table-bordered '>
                                    <tbody>
                                        <tr>
                                            <th>Subtotal</th>
                                            <td>&#8377;{subtotal}</td>
                                        </tr>
                                        <tr>
                                            <th>Shipping</th>
                                            <td>&#8377;{shipping}</td>
                                        </tr>
                                        <tr>
                                            <th>Total</th>
                                            <td>&#8377;{total}</td>
                                        </tr>

                                        {
                                            title === 'Checkout' ?
                                                <tr>
                                                    <th>Payment Mode</th>
                                                    <td>
                                                        <select className='form-select border-3 border-primary' onChange={(e) => setMode(e.target.value)} >
                                                            <option value="COD">COD</option>
                                                            <option value="Net Banking" disabled>Net Banking/Cart/UPI</option>
                                                        </select>
                                                    </td>
                                                </tr> : null
                                        }

                                        <tr>
                                            <td colSpan={2}>
                                                {title !== 'Checkout' ? <Link to='/checkout' className='btn btn-primary w-100'> Procced To Checkout</Link> :
                                                    <button className='btn btn-primary w-100' onClick={placeOrder} >Place Order</button>}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>}
                    </> : <div className="mb-5 text-center mt-3 mb-5">
                        <h3>No item in Cart</h3>
                        <Link to='/shop' className='btn btn-primary'>Shop Now</Link>
                    </div>

            }
            <div className="pb-5"></div>
        </>
    )
}
