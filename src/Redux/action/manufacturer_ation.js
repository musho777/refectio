import { FetchGet, FetchPost } from "./fetch"

export const GetAllManufacturers = (page) => { return FetchGet(`/GetAllProductForWeb?page=${page}`, 'getAllManufacturers') }
export const GetSingleManufacturer = (name) => { return FetchGet(`/getOneProizvoditelForWeb/user_name=${name}`, 'singleManufacturer') }
export const SearchManufacturers = (company_name) => { return FetchPost('/searchProizvoditel', { company_name }, 'search', 'searchError') }
export const FilterCategories = (parent_category_name, user_id) => { return FetchPost('/filtergetOneProizvoditel', { parent_category_name, user_id }, 'filterManuCategories') }