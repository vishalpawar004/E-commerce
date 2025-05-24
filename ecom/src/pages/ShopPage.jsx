import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useSearchParams } from 'react-router-dom'


import Product from '../Components/Product'
import HeroSection from '../Components/HeroSection'

import { getMaincategory } from "../Redux/ActionCreartors/MaincategoryActionCreators"
import { getSubcategory } from "../Redux/ActionCreartors/SubcategoryActionCreators"
import { getBrand } from "../Redux/ActionCreartors/BrandActionCreators"
import { getProduct } from "../Redux/ActionCreartors/ProductActionCreators"
import { apply } from 'redux-saga/effects'

export default function ShopPage() {
  let [data, setData] = useState([])
  let [mc, setMc] = useState("")
  let [sc, setSc] = useState("")
  let [br, setBr] = useState("")
  let [flag,setflag] = useState(false)
  let [search,setSearch] = useState("")
  let [min,setMin] = useState(0)
  let [max,setMax] = useState(1000)

  let ProductStateData = useSelector((state) => state.ProductStateData)
  let MaincategoryStateData = useSelector((state) => state.MaincategoryStateData)
  let SubcategoryStateData = useSelector((state) => state.SubcategoryStateData)
  let BrandStateData = useSelector((state) => state.BrandStateData)

  let dispatch = useDispatch()
  let [searchParams, setSearchParams] = useSearchParams()

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


  function filterData(mc, sc, br,min=-1,max=-1) {
    setSearch("")
    setData(ProductStateData.filter((p) => {
      return (mc === "All" || mc === p.maincategory) &&
        (sc === "All" || sc === p.subcategory) &&
        (br === "All" || br === p.brand) &&
        (min === -1 || p.finalPrice >= min)&&
        (max === -1 || p.finalPrice <= max)
    }))
  }

function sortFilter(option){
  if(option=="1"){
    setData(data.sort((x,y)=>x.id.lnocaleCompare(x.id)))
  }else if(option=="2"){
    setData(data.sort((x,y)=>y.finalPrice - x.finalPrice))
  }else{
    setData(data.sort((x,y)=>x.finalPrice - y.finalPrice))
  }
  setflag(!flag)
}

function postSearch(e){
  e.preventDefault()
  let ch = search.toLocaleLowerCase()
  setData(ProductStateData.filter(x=>x.active && x.maincategory?.toLocaleLowerCase().includes(ch) || x.subcategory?.toLocaleLowerCase().includes(ch) || x.brand?.toLocaleLowerCase().includes(ch)))
}

function applyPriceFilter(e){
  e.preventDefault()
  filterData(mc,sc,br,min,max)
}
  useEffect(() => {
    (() => {
      dispatch(getProduct())
      let mc = searchParams.get("mc") ?? "All"
      let sc = searchParams.get("sc") ?? "All"
      let br = searchParams.get("br") ?? "All"
      if (ProductStateData.length) {
        setMc(mc)
        setSc(sc)
        setBr(br)
        filterData(mc, sc, br)
      }
    })()
  }, [ProductStateData.length, searchParams])
  return (
    <>
      <HeroSection title="Shop" />
      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-md-2 mb-5">
            <div className="list-group mb-3">
              <a href="#" className="list-group-item list-group-item-action active" aria-current="true">
                Maincategory
              </a>
              <Link to={`/shop?mc=All&sc=${sc}&br=${br}`} className="list-group-item list-group-item-action">All</Link>
              {MaincategoryStateData.filter(x => x.active).map(item => {
                return <Link to={`/shop?mc=${item.name}&sc=${sc}&br=${br}`} key={item.id} className="list-group-item list-group-item-action">{item.name}</Link>
              })}
            </div>

            <div className="list-group mb-3">
              <a href="#" className="list-group-item list-group-item-action active" aria-current="true">
                Subcategory
              </a>
              <Link to={`/shop?mc=${mc}&sc=All&br=${br}`} className="list-group-item list-group-item-action">All</Link>
              {SubcategoryStateData.filter(x => x.active).map(item => {
                return <Link to={`/shop?mc=${mc}&sc=${item.name}&br=${br}`} key={item.id} className="list-group-item list-group-item-action">{item.name}</Link>
              })}
            </div>

            <div className="list-group mb-3">
              <a href="#" className="list-group-item list-group-item-action active" aria-current="true">
                Brand
              </a>
              <Link to={`/shop?mc=${mc}&sc=${sc}&br=All`} className="list-group-item list-group-item-action">All</Link>
              {BrandStateData.filter(x => x.active).map(item => {
                return <Link to={`/shop?mc=${mc}&sc=${sc}&br=${item.name}`} key={item.id} className="list-group-item list-group-item-action">{item.name}</Link>
              })}
            </div>
            <h5 className='bg-primary text-light text-center p-2'>Price Filter</h5>
            <form onSubmit={applyPriceFilter} >
              <div className="row">
                <div className="col-6 mb-3">
                  <label >Min</label>
                  <input type="number" name='min' value={min} placeholder='Min' onChange={(e)=>setMin(e.target.value)} className='form-control border-3 border-primary' />
                </div>
                <div className="col-6 mb-3">
                  <label >Max</label>
                  <input type="number" name='max' value={max} placeholder='Max' onChange={(e)=>setMax(e.target.value)} className='form-control border-3 border-primary' />
                </div>
                <div className="mb-3">
                  <button className=' btn btn-primary text-light text-center p-2'>Apply Filter</button>
                </div>
              </div>
            </form>
          </div>
          <div className="col-md-10">
            <div className="col-md-10">
              <div className="row">
                <div className="col-md-9 mb-3">
                  <form onSubmit={postSearch}>
                    <div className="btn-group w-100">
                      <input type="text" onChange={(e)=>setSearch(e.target.value)} value={search} placeholder='Serach Product by Name , Maincategory,Subcategory, Brand , color Etc...' className='form-control border-3 border-primary' style={{borderRadius:"10px 0px 0 10px"}}  />
                    <button type='submit'  className="btn btn-primary">Search</button>
                    </div>
                  </form>
                </div>
                <div className="col-md-3">
                  <select name="sortFilter" onChange={(e)=>sortFilter(e.target.value)} className='form-select border-3 border-primary'>
                    <option value="1">Latest</option>
                    <option value="2">Price:High to Low</option>
                    <option value="3">Price:Low to High</option>
                  </select>
                </div>
              </div>
            </div>
            <Product title="Shop" data={data} />
          </div>
        </div>
      </div>
    </>
  )
}