import { combineReducers } from "@reduxjs/toolkit"
import MaincategoryReducer from "./MaincategoryReducer"
import SubcategoryReducer from './SubcategoryReducer'
import BrandReducer from './BrandReducer'
import ProductReducer from './ProductReducer'
import TestimonialReducer from './TestimonialReducer'
import CartReducer from './CartReducer'
import ContactUsReducer from './ContactUsReducer'
import CheckoutReducer from './CheckoutReducer'
import NewsletterReducer from './NewsletterReducer'
import WishlistReducer from './WishlistReducer'




export default combineReducers({
    MaincategoryStateData: MaincategoryReducer,
    SubcategoryStateData: SubcategoryReducer,
    BrandStateData: BrandReducer,
    ProductStateData: ProductReducer,
    TestimonialStateData: TestimonialReducer,
    CartStateData: CartReducer,
    WishlistStateData: WishlistReducer,
    CheckoutStateData: CheckoutReducer,
    ContactUsStateData: ContactUsReducer,
    NewsletterStateData: NewsletterReducer,


    
})