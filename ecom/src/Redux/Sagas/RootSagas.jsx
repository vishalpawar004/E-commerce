import { all } from "redux-saga/effects"

import maincategorySagas from "./MaincategorySagas"
import subcategorySagas from "./SubcategorySagas"
import brandSagas from "./BrandSagas"
import productSagas from "./ProductSagas"
import testimonialSagas from "./TestimonialSagas"
import newsletterSagas from "./NewsletterSagas"
import cartSagas from "./CartSagas"
import contactusSagas from "./ContactUsSagas"
import checkoutSagas from "./CheckoutSagas"
import wishlistSagas from "./WishlistSagas"
export default function* RootSaga() {
    yield all([
        maincategorySagas(),
        subcategorySagas(),
        brandSagas(),
        productSagas(),
        testimonialSagas(),
        newsletterSagas(),
        cartSagas(),
        contactusSagas(),
        checkoutSagas(),
        wishlistSagas()
    ])
}