import './style.css'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ClosedEye, CloseIcon, OpenedEye } from '../../svg'
import { ClearPasswordErrors, UpdatePassword, UpdateSuccessful } from '../../../Redux/action/myProfile_action'

export const EditPassword = ({ open, setOpen }) => {
    const dispatch = useDispatch()
    const passwordError = useSelector(st => st.MyProfile_reducer.passwordError)
    const update = useSelector(st => st.MyProfile_reducer.update)
    const [oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showOldPass, setShowOldPass] = useState(false)
    const [showPass, setShowPass] = useState(false)
    const [showConfirmPass, setShowConfirmPass] = useState(false)
    const [errors, setErrors] = useState({
        oldPasswordError: '',
        passwordError: '',
        confirmPasswordError: '',
        validation: ''
    })
    const scrollPosition = window.scrollY || window.pageYOffset

    useEffect(() => {
        document.querySelector('.mainLayout').style.position = 'fixed'
        document.querySelector('.mainLayout').style.top = -scrollPosition
    }, [])

    useEffect(() => {
        if (update) {
            dispatch(UpdateSuccessful())
            close()
        }
    }, [update, dispatch])

    function save() {
        if (!oldPassword.length) {
            setErrors({ ...errors, oldPasswordError: 'Обязательное поле' })
        } else if (oldPassword.length < 6) {
            setErrors({ ...errors, oldPasswordError: 'Пароль должен содержать не менее 6-ти символов' })
        } else if (!password.length) {
            setErrors({ ...errors, oldPasswordError: '', passwordError: 'Обязательное поле' })
        } else if (password.length < 6) {
            setErrors({ ...errors, oldPasswordError: '', passwordError: 'Пароль должен содержать не менее 6-ти символов' })
        } else if (!confirmPassword.length) {
            setErrors({ ...errors, oldPasswordError: '', passwordError: '', confirmPasswordError: 'Обязательное поле' })
        } else if (confirmPassword.length < 6) {
            setErrors({ ...errors, oldPasswordError: '', passwordError: '', confirmPasswordError: 'Пароль должен содержать не менее 6-ти символов' })
        } else {
            setErrors({
                oldPasswordError: '',
                passwordError: '',
                confirmPasswordError: '',
                validation: ''
            })
            if (password !== confirmPassword) {
                setErrors({ passwordError: ' ', confirmPasswordError: ' ', validation: 'Пароли не совпадают' })
            } else {
                setErrors({
                    oldPasswordError: '',
                    passwordError: '',
                    confirmPasswordError: '',
                    validation: ''
                })
                dispatch(UpdatePassword(oldPassword, password, confirmPassword))
            }
        }
    }

    function close() {
        document.querySelector('.mainLayout').style.position = 'relative'
        window.scrollTo(0, scrollPosition)
        dispatch(ClearPasswordErrors())
        setOpen(false)
    }

    return (
        <div className={open ? 'activePopup' : 'inactive'}>
            <div className='pop' style={{ width: '560px' }}>
                <div className='close' onClick={close}>
                    <CloseIcon />
                </div>
                <h1 className='passowrdTitle'>Изменить пароль</h1>
                <div className='loginInputs'>
                    <label>Старый пароль</label>
                    <div className='loginPaswordInput'>
                        <input
                            type={showOldPass ? 'text' : 'password'}
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            style={(errors.oldPasswordError || passwordError) ? { border: '1px solid red' } : {}}
                            onKeyDown={(e) => e.key === 'Enter' && save()}
                        />
                        <div onClick={() => setShowOldPass(!showOldPass)}>
                            {showOldPass ? <ClosedEye /> : <OpenedEye />}
                        </div>
                    </div>
                    {errors.oldPasswordError && <span className='loginError'>{errors.oldPasswordError}</span>}
                    {passwordError && <span className='loginError'>{passwordError}</span>}
                </div>
                <div className='loginInputs'>
                    <label>Новый пароль</label>
                    <div className='loginPaswordInput'>
                        <input
                            type={showPass ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={errors.passwordError ? { border: '1px solid red' } : {}}
                            onKeyDown={(e) => e.key === 'Enter' && save()}
                        />
                        <div onClick={() => setShowPass(!showPass)}>
                            {showPass ? <ClosedEye /> : <OpenedEye />}
                        </div>
                    </div>
                    {errors.passwordError && <span className='loginError'>{errors.passwordError}</span>}
                </div>
                <div className='loginInputs'>
                    <label>Подтвердите пароль</label>
                    <div className='loginPaswordInput'>
                        <input
                            type={showConfirmPass ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            style={errors.confirmPasswordError ? { border: '1px solid red' } : {}}
                            onKeyDown={(e) => e.key === 'Enter' && save()}
                        />
                        <div onClick={() => setShowConfirmPass(!showConfirmPass)}>
                            {showConfirmPass ? <ClosedEye /> : <OpenedEye />}
                        </div>
                    </div>
                    {errors.confirmPasswordError && <span className='loginError'>{errors.confirmPasswordError}</span>}
                    {errors.validation && <span className='loginError'>{errors.validation}</span>}
                </div>
                <div className='loginButton'>
                    <button onClick={save}>Сохранить</button>
                </div>
            </div>
        </div>
    )
}