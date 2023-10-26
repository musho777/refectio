import './style.css'
import { CloseIcon } from '../../svg'
import { useState, useEffect } from 'react'
import ReactInputMask from 'react-input-mask'
import { useDispatch, useSelector } from 'react-redux'
import { ClearPhoneError, PhoneCode, UpdatePhone } from '../../../Redux/action/myProfile_action'

export const EditPhone = ({ open, setOpen }) => {
    const dispatch = useDispatch()
    const phoneToken = useSelector(st => st.MyProfile_reducer.phoneToken)
    const phoneError = useSelector(st => st.MyProfile_reducer.phoneError)
    const codeError = useSelector(st => st.MyProfile_reducer.codeError)
    const update = useSelector(st => st.MyProfile_reducer.update)
    const [phoneNumber, setPhoneNumber] = useState('')
    const [error, setError] = useState('')
    const [openCodePage, setOpenCodePage] = useState(false)
    const [code, setCode] = useState('')
    const [counter, setCounter] = useState(0)
    const scrollPosition = window.scrollY || window.pageYOffset

    useEffect(() => {
        document.querySelector('.mainLayout').style.position = 'fixed'
        document.querySelector('.mainLayout').style.top = -scrollPosition
    }, [])

    useEffect(() => {
        if (counter > 0) {
            setTimeout(() => setCounter(counter - 1), 1000)
            window.scrollTo(0, scrollPosition)
        }
    }, [counter])

    useEffect(() => {
        if (phoneToken) {
            const token = localStorage.getItem('token')
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`)
            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                redirect: 'follow',
                body: JSON.stringify({})
            }
            fetch(`${process.env.REACT_APP_HOSTNAME}/updateCodeIntestTable`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (result.status) {
                        setError('')
                        setOpenCodePage(true)
                        setCounter(59)
                        // Timer
                    } else {
                        setError('Этот номер телефона уже зарегистрирован')
                    }
                })
                .catch((error) => {
                    setError('Что-то пошло не так. Пожалуйста, повторите попытку позже', error)
                })
        }
    }, [phoneToken, dispatch])

    useEffect(() => {
        if (phoneError) {
            setError(phoneError)
        } else {
            setError('')
            dispatch(ClearPhoneError())
        }
    }, [phoneError, dispatch])

    useEffect(() => {
        if (codeError) {
            setError(codeError)
        } else {
            setError('')
        }
    }, [codeError])

    useEffect(() => {
        if (update) {
            window.location.reload()
        }
    }, [update])

    function close() {
        setOpenCodePage(false)
        setPhoneNumber('')
        setError('')
        setOpen(false)
        document.querySelector('.mainLayout').style.position = 'relative'
    }

    function savePhone() {
        if (!phoneNumber || phoneNumber.includes('_')) {
            setError('Обязательное поле')
        } else {
            setError('')
            dispatch(UpdatePhone(phoneNumber))
        }
    }

    function saveCode() {
        if (!code.length || code.length < 4) {
            setError('Обязательное поле')
        } else {
            setError('')
            dispatch(PhoneCode(code))
        }
    }

    return (
        <div className={open ? 'activePopup' : 'inactive'}>
            <div className='pop'>
                <div className='close' onClick={close}>
                    <CloseIcon />
                </div>
                {openCodePage ? <h1 className='passowrdTitle'>Введите код подтверждения</h1> : <h1 className='passowrdTitle'>Введите новый номер телефона</h1>}
                {openCodePage
                    ? <>
                        <div className='loginInputs'>
                            <input
                                type='number'
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                style={error ? { border: '1px solid red' } : {}}
                                onKeyDown={(e) => e.key === 'Enter' && saveCode()}
                            />
                            {error.length > 0 && <span className='loginError'>{error}</span>}
                            <div className='timer'>
                                <span onClick={(e) => {
                                    if (counter > 0) {
                                        e.preventDefault()
                                        e.stopPropagation()
                                    } else {
                                        setCounter(59)
                                        savePhone()
                                    }
                                }} style={counter > 0 ? { color: '#a6a6a6', cursor: 'wait' } : { color: '#333', cursor: 'pointer' }}>Отправить код повторно</span>
                                {counter > 0 && <p>Вы можете отправить код повторно через 00 : {counter}</p>}
                            </div>
                        </div>
                        <div className='loginButton' style={{ margin: 0 }}>
                            <button onClick={saveCode}>Отправить</button>
                        </div>
                    </>
                    : <>
                        <div className='loginInputs'>
                            <label>Номер телефона</label>
                            <ReactInputMask
                                mask="+7 (999) 999-99-99"
                                maskChar="_"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                style={error ? { border: '1px solid red' } : {}}
                                onKeyDown={(e) => e.key === 'Enter' && savePhone()}
                            />
                            {error.length > 0 && <span className='loginError'>{error}</span>}
                        </div>
                        <div className='loginButton' style={{ margin: 0 }}>
                            <button onClick={savePhone}>Изменить</button>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}