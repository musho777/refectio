import { FetchGet, FetchPost } from "./fetch"

export const AllMyProducts = () => { return FetchGet(`/getOneProizvoditel/user_id=${localStorage.getItem('userId')}`, 'myProducts') }
export const DeleteProduct = (product_id) => { return FetchPost('/deleteAuthUserProduct', { product_id }, 'deleteProduct') }
export const SingleProduct = (product_id) => { return FetchPost('/SinglePageProductFromUpdate', { product_id }, 'singleProduct') }
export const FilterCategories = (parent_category_name) => { return FetchPost('/filtergetOneProizvoditel', { parent_category_name, user_id: localStorage.getItem('userId') }, 'filterCategories') }