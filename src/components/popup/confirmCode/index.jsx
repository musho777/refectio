import { CloseIcon } from '../../svg'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ResetError, SendCall, VerifyCode } from '../../../Redux/action/auth_action'

export const ConfirmCode = ({ open, setOpen, token }) => {
    const dispatch = useDispatch()
    const [code, setCode] = useState('')
    const [codeError, setCodeError] = useState('')
    const codeErrorBack = useSelector(st => st.Auth_reducer.codeError)
    const [counter, setCounter] = useState(0)
    const scrollPosition = window.scrollY || window.pageYOffset

    useEffect(() => {
        document.querySelector('.mainLayout').style.position = 'fixed'
        document.querySelector('.mainLayout').style.top = -scrollPosition
        sendCall()
    }, [token])

    useEffect(() => {
        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000)
    }, [counter])

    function sendCall() {
        token && dispatch(SendCall(token))
    }

    function confirm() {
        if (!code?.length) {
            setCodeError('Обязательное поле')
        } else if (code?.length < 4) {
            setCodeError('Код должен содержать 4 символа')
        } else {
            setCodeError('')
            dispatch(VerifyCode(code, token))
        }
    }

    function close() {
        document.querySelector('.mainLayout').style.position = 'relative'
        window.scrollTo(0, scrollPosition)
        setCodeError('')
        dispatch(ResetError())
        setOpen(false)
    }

    return (
        <div className={open ? 'activePopup' : 'inactive'}>
            <div className='pop' style={{ width: '460px' }}>
                <div className='close' onClick={close}>
                    <CloseIcon />
                </div>
                <div className='loginInputs'>
                    <label>Код подтверждения</label>
                    <input
                        type={'number'}
                        value={code}
                        onChange={(e) => e.target.value.length < 5 && setCode(e.target.value)}
                        style={(codeError.length > 0 || codeErrorBack?.length > 0) ? { border: '1px solid red' } : {}}
                        onKeyDown={(e) => e.key === 'Enter' && confirm()}
                    />
                    {!codeErrorBack && codeError && <span className='errorMessage'>{codeError}</span>}
                    {codeErrorBack && <span className='errorMessage'>{codeErrorBack}</span>}
                    <div className='timer'>
                        <span onClick={(e) => {
                            if (counter > 0) {
                                e.preventDefault()
                                e.stopPropagation()
                            } else {
                                setCounter(59)
                                sendCall()
                            }
                        }} style={counter > 0 ? { color: '#a6a6a6', cursor: 'wait' } : { color: '#333', cursor: 'pointer' }}>Отправить код повторно</span>
                        {counter > 0 && <p>Вы можете отправить код повторно через 00 : {counter}</p>}
                    </div>
                </div>
                <div className='loginButton' style={{ marginTop: 0 }}>
                    <button onClick={confirm}>Подтвердить</button>
                </div>
            </div>
        </div>
    )
}