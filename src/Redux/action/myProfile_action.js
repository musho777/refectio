import { FetchGet, FetchPost } from "./fetch"

export const MyProfile = () => { return FetchGet('/AuthUserProfile', 'myProfile', 'myProfileError') }
export const GetCities = () => { return FetchGet('/getCityApi', 'getCities') }
export const GetCategories = () => { return FetchGet('/GetProductCategory', 'getProducts') }
export const UpdateSuccessful = () => { return { type: 'updateSuccessful' } }
export const ClearPasswordErrors = () => { return { type: 'clearPasswordErrors' } }
export const ClearPhoneError = () => { return { type: 'clearPhoneError' } }
export const UpdateCountry = (made_in) => { return FetchPost('/updateManeInProizvoditel', { made_in }, 'updateSuccess') }
export const UpdateCode = (individual_number) => { return FetchPost('/UpdateIndividualNumberProizvoditel', { individual_number }, 'updateSuccess') }
export const UpdateName = (company_name) => { return FetchPost('/updateProfileCompanyName', { company_name }, 'updateSuccess') }
export const UpdateTelegram = (telegram) => { return FetchPost('/UpdateTelegramChanel', { telegram }, 'updateSuccess') }
export const UpdateSite = (saite) => { return FetchPost('/updateSaiteProizvaditel', { saite }, 'updateSuccess') }
export const UpdateAbout = (about_us) => { return FetchPost('/update_about_us_user', { about_us }, 'updateSuccess') }
export const UpdatePassword = (old_password, password, password_confirmation) => { return FetchPost('/updatePasswordUser', { old_password, password, password_confirmation }, 'updatePassword') }
export const UpdateCities = (cities) => { return FetchPost('/UpdategorodaProdaji', { 'sales_city': cities }, 'updateSuccess') }
export const UpdatePhone = (phone) => { return FetchPost('/newnumberProizvoditel', { phone }, 'updatePhone') }
export const PhoneCode = (code) => { return FetchPost('/updatePhoneNumberProizvoditel', { code }, 'phoneCode') }