import store from "../store/auth_store"

export const Auth_reducer = (state = store, action) => {
    let temp = { ...state }
    switch (action.type) {
        case 'login':
            if (action.payload.status) {
                if (action.payload?.message?.message?.includes('login succsesfuli')) {
                    localStorage.setItem('token', action.payload?.message?.token)
                    temp.user = action.payload.message.user
                    localStorage.setItem('userId', action.payload.message.user.id)
                    window.location = '/'
                }
            } else {
                if (action.payload?.message?.message?.includes('user does not exist')) {
                    temp.loginError = 'Неправильный номер телефона или пароль'
                } else if (action.payload?.message?.message?.includes('wrong password')) {
                    temp.loginError = 'Неправильный номер телефона или пароль'
                } else if (action.payload?.message?.includes('verification error')) {
                    temp.loginError = 'Verification error'
                }
            }
            break;
        case 'getAllCountries':
            if (action.payload.status) {
                temp.countries = action.payload.data
            }
            break;
        case 'sendCall':
            if (action.payload.message === 'Green Error Pleace send code 10 minute ago') {
                temp.codeError = 'Повторите попытку через 10 минут.'
            }
            if (action.payload.status) {
                temp.codeError = ''
            } else if (action.payload.data[0].includes('1 minute ago')) {
                temp.codeError = 'Повторите попытку через 1 минуту.'
            }
            break;
        case 'sendCallError':
            break;
        case 'verifyCode':
            if (action.payload.status) {
                temp.codeError = ''
                localStorage.setItem('token', action.payload?.message?.token)
                localStorage.setItem('userId', action.payload?.message?.user[0]?.id)
                window.location = '/'
            } else if (action.payload?.message[0]?.includes('wrong verification code')) {
                temp.codeError = 'Неверный код'
            } else if (action.payload?.message[0]?.includes('1 minute ago')) {
                temp.codeError = 'Повторите попытку через 1 минуту.'
            }
            break;
        case 'resetError':
            temp.codeError = ''
            break;
        case 'logout':
            localStorage.clear()
            window.location.reload()
            break;
        default:
            return temp;
    }
    return temp;
} 