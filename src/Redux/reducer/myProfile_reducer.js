import store from '../store/myProfile_store'

export const MyProfile_reducer = (state = store, action) => {
    let temp = { ...state }
    switch (action.type) {
        case 'myProfile':
            if (action.payload.status) temp.user = action.payload.data[0]
            break;
        case 'myProfileError':
            break;
        case 'updateSuccessful':
            temp.update = false
            break;
        case 'updateSuccess':
            if (action.payload.status) {
                temp.update = true
                temp.nameError = ''
            }
            else if (action.payload.message.includes('This Company Name Exist')) {
                temp.nameError = 'Производитель с таким именем уже существует.'
            }
            break;
        case 'getCities':
            if (action.payload.status) {
                let city = []
                action.payload.data.city.forEach(element => {
                    city.push({ label: element.name, value: `${element.id}^${element.name}` })
                })
                temp.cities = city
            }
            break;
        case 'getProducts':
            if (action.payload.status) temp.categories = action.payload.data.city
            break;
        case 'updatePassword':
            if (action.payload.status) {
                if (action.payload.data.message.includes('password updated')) {
                    temp.passwordError = ''
                    temp.update = true
                }
            } else {
                if (action.payload.data.message.includes('wrong password')) temp.passwordError = 'Неправильный пароль'
            }
            break;
        case 'clearPasswordErrors':
            temp.passwordError = ''
            break;
        case 'clearPhoneError':
            temp.phoneError = ''
            break;
        case 'updatePhone':
            if (action.payload.status) {
                temp.phoneError = ''
                temp.phoneToken = new Date()
            } else {
                temp.phoneError = 'Этот номер телефона уже зарегистрирован'
            }
            break;
        case 'phoneCode':
            if (action.payload.status) {
                temp.codeError = ''
                temp.update = true
            } else {
                temp.codeError = 'Неправильный код подтверждения'
            }
            break;
        default:
            return temp;
    }
    return temp;
}