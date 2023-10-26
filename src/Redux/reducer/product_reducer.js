import store from "../store/product_store"

export const Product_reducer = (state = store, action) => {
    let temp = { ...state }
    switch (action.type) {
        case 'myProducts':
            if (action.payload.status) {
                temp.myProducts = action.payload.data.products
                temp.myCategories = action.payload.data.user_category_for_product
            } else if (action.payload.data.message.includes('no product')) {
                temp.myProducts = []
                temp.myCategories = []
            }
            break;
        case 'deleteProduct':
            if (action.payload?.status) temp.update = new Date()
            break;
        case 'singleProduct':
            if (action.payload.status) {
                temp.singleProduct = action.payload.data[0]
            }
            break;
        case 'filterCategories':
            if (action.payload.status) {
                temp.filteredProducts = action.payload.data.products
            }
            break;
        default:
            return temp;
    }
    return temp;
}