import { FetchGet, FetchPost, FetchPostToken } from './fetch'

export const AuthUser = (login, password) => { return FetchPost('/loginuser', { login, password }, 'login', 'loginError') }
export const Logout = () => { return FetchPost('/UserLogout', { null: null }, 'logout') }
export const GetAllCountries = () => { return FetchGet('/AllCountry', 'getAllCountries') }
export const SendCall = (token) => { return (FetchPostToken('/sendCallUser', { "NULL": "NULL" }, token, 'sendCall', 'sendCallError')) }
export const VerifyCode = (code, token) => { return FetchPostToken('/updateveryficode', { phone_veryfi_code: code }, token, 'verifyCode') }
export const ResetError = () => { return { type: 'resetError' } }