import { combineReducers } from 'redux'
import { Auth_reducer } from './auth_reducer'
import { Product_reducer } from './product_reducer'
import { Manufacturer_reducer } from './manufacturer_reducer'
import { MyProfile_reducer } from './myProfile_reducer'

export default combineReducers({
    Auth_reducer,
    Product_reducer,
    Manufacturer_reducer,
    MyProfile_reducer,
})
