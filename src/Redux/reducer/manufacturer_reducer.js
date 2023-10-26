import store from '../store/manufacturer_store'

export const Manufacturer_reducer = (state = store, action) => {
    let temp = { ...state }
    switch (action.type) {
        case 'getAllManufacturers':
            temp.allManufacturers = action.payload.data.data.data
            temp.pagination = {
                page_count: action.payload.data.data.last_page,
                next_page_url: action.payload.data.data.next_page_url,
                prev_page_url: action.payload.data.data.prev_page_url,
                first_page_url: action.payload.data.data.first_page_url,
                last_page_url: action.payload.data.data.last_page_url,
                current_page: action.payload.data.data.current_page,
            }
            break;
        case 'singleManufacturer':
            if (action.payload.status) {
                temp.singleManufacturerUser = action.payload.data.user[0]
                temp.singleManufacturerCategories = action.payload.data?.user_category_for_product
                temp.singleManufacturerCities = action.payload.data?.city_for_sales_user
                temp.singleManufacturerProducts = action.payload.data?.products
            } else {
                window.location = '/'
            }
            break;
        case 'search':
            temp.search = action.payload.data.user
            break;
        case 'searchError':
            temp.search = []
            break;
        case 'filterManuCategories':
            if (action.payload.status) {
                temp.singleManufacturerFilteredProducts = action.payload.data.products
            }
            break;
        default:
            return temp;
    }
    return temp;
}