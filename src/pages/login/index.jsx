import './style.css'
import { useState } from 'react'
import ReactInputMask from 'react-input-mask'
import { useDispatch, useSelector } from 'react-redux'
import { AuthUser } from '../../Redux/action/auth_action'
import { OpenedEye, ClosedEye } from '../../components/svg'

export const Login = () => {
    const dispatch = useDispatch()
    const loginError = useSelector(st => st.Auth_reducer.loginError)
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [errors, setErrors] = useState({
        phoneError: '',
        passwordError: ''
    })

    function login() {
        if (!phone || phone.includes('_')) {
            setErrors({ ...errors, phoneError: 'Обязательное поле' })
        } else if (!password.length) {
            setErrors({ ...errors, phoneError: '', passwordError: 'Обязательное поле' })
        } else if (password.length < 6) {
            setErrors({ ...errors, passwordError: 'Пароль должен содержать не менее 6-ти символов.' })
        } else {
            setErrors({ phoneError: '', passwordError: '' })
            dispatch(AuthUser(phone, password))
        }
    }

    return (
        <div className='loginPage'>
            <div className='loginBlock'>
                <div className='loginTitle'>
                    <h1>Вход</h1>
                    <span onClick={() => window.location = '/auth/register'}>Регистрация</span>
                </div>
                <div className='loginInputs'>
                    <label>Номер телефона</label>
                    <ReactInputMask
                        mask="+7 (999) 999-99-99"
                        maskChar="_"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        style={(errors.phoneError || loginError) ? { border: '1px solid red', fontFamily: 'sans-serif' } : {}}
                        onKeyDown={(e) => e.key === 'Enter' && login()}
                    />
                    {errors.phoneError && <span className='loginError'>{errors.phoneError}</span>}
                </div>
                <div className='loginInputs'>
                    <label>Пароль</label>
                    <div className='loginPaswordInput'>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={(errors.passwordError || loginError) ? { border: '1px solid red' } : {}}
                            onKeyDown={(e) => e.key === 'Enter' && login()}
                        />
                        <div onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <ClosedEye /> : <OpenedEye />}
                        </div>
                    </div>
                    {errors.passwordError && <span className='loginError'>{errors.passwordError}</span>}
                    {loginError && <span className='loginError'>{loginError}</span>}
                </div>
                <div className='loginForgotPassword'>
                    <span>Забыли пароль?</span>
                </div>
                <div className='loginButton'>
                    <button onClick={login}>Войти</button>
                </div>
                <div className='loginNoAccount'>
                    <p>Нет аккаунта?<span onClick={() => window.location = '/auth/register'}> Зарегистрироваться</span></p>
                </div>
            </div>
        </div>
    )
}