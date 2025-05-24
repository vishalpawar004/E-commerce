import React from 'react'
import HeroSection from '../../Components/HeroSection'
import AdminSidebar from '../../Components/AdminSidebar'
import Profile from '../../Components/Profile'

export default function AdminHome() {
  return (
    <>
    <HeroSection title='Admin'/>
    <div className="container-fluid my-3 ">
    <div className="row">
        <div className="col-md-3">
            <AdminSidebar/>
        </div>
        <div className="col-md-9">
            <Profile title='Admin'/>
        </div>
    </div>
    </div>
    </>
  )
}
