import './style.css'
import { useState, useEffect } from 'react'
import ReactInputMask from 'react-input-mask'
import RichTextEditor from '../../components/editor'
import { useDispatch, useSelector } from 'react-redux'
import { MultiSelect } from 'react-multi-select-component'
import { OpenedEye, ClosedEye, RegisterCheckbox, Asterisk } from '../../components/svg'
import { GetCities } from '../../Redux/action/myProfile_action'
import { GetAllCountries } from '../../Redux/action/auth_action'
import { ConfirmCode } from '../../components/popup/confirmCode'

export const Register = () => {
    const dispatch = useDispatch()
    const loginError = useSelector(st => st.Auth_reducer.loginError)
    const countries = useSelector(st => st.Auth_reducer.countries)
    const cities = useSelector(st => st.MyProfile_reducer.cities)
    const [showPassword, setShowPassword] = useState(false)
    const [show_password_confirmation, setShow_password_confirmation] = useState(false)
    const [selectedCities, setSelectedCities] = useState([])
    const [file, setFile] = useState(null)
    const [openCode, setOpenCode] = useState(false)
    const [token, setToken] = useState(null)
    const [description, setDescription] = useState({ description: '' })
    const [errors, setErrors] = useState({
        name: '',
        phone: '',
        whatsapp: '',
        country: '',
        password: '',
        password_confirmation: '',
        logo: '',
        checkbox: '',
    })
    const [details, setDetails] = useState({
        name: '',
        code: '',
        phone: '',
        whatsapp: '',
        country: 'Беларусь',
        site: '',
        telegram: '',
        showroom: 'Да',
        designer: 'Да',
        models: 'Да',
        password: '',
        password_confirmation: '',
        checkbox: false,
    })

    useEffect(() => {
        dispatch(GetCities())
        dispatch(GetAllCountries())
    }, [dispatch])

    function handleImageChange(e) {
        if (e.target.files.length) {
            setFile(e.target.files[0])
            document.getElementById('avatar').innerHTML = `<img alt='' src=${URL.createObjectURL(e.target.files[0])} />`
        }
    }

    function register() {
        if (!details?.name?.length) {
            setErrors({ ...errors, name: 'Обязательное поле' })
        } else if (!details?.phone?.length) {
            setErrors({ ...errors, name: '', phone: 'Обязательное поле' })
        } else if (!details.whatsapp?.length) {
            setErrors({ ...errors, name: '', phone: '', whatsapp: 'Обязательное поле' })
        } else if (!details.country?.length) {
            setErrors({ ...errors, name: '', phone: '', whatsapp: '', country: 'Обязательное поле' })
        } else if (!details.password?.length) {
            setErrors({ ...errors, name: '', phone: '', whatsapp: '', country: '', password: 'Обязательное поле' })
        } else if (details.password?.length < 6) {
            setErrors({ ...errors, name: '', phone: '', whatsapp: '', country: '', password: 'Пароль должен содержать не менее 6-ти символов' })
        } else if (!details.password_confirmation?.length) {
            setErrors({ ...errors, name: '', phone: '', whatsapp: '', country: '', password: '', password_confirmation: 'Обязательное поле' })
        } else if (details.password_confirmation?.length < 6) {
            setErrors({ ...errors, name: '', phone: '', whatsapp: '', country: '', password: '', password_confirmation: 'Пароль должен содержать не менее 6-ти символов' })
        } else if (details.password !== details.password_confirmation) {
            setErrors({ ...errors, name: '', phone: '', whatsapp: '', country: '', password: 'Пароли не совпадают', password_confirmation: 'Пароли не совпадают' })
        } else if (!file) {
            setErrors({ ...errors, name: '', phone: '', whatsapp: '', country: '', password: '', password_confirmation: '', logo: 'Обязательное поле' })
        } else if (!details.checkbox) {
            setErrors({ ...errors, name: '', phone: '', whatsapp: '', country: '', password: '', password_confirmation: '', logo: '', checkbox: 'Обязательное поле' })
        } else {
            setErrors({
                name: '',
                phone: '',
                whatsapp: '',
                country: '',
                password: '',
                password_confirmation: '',
                logo: '',
                checkbox: '',
            })
            const myHeaders = new Headers();
            const formdata = new FormData();
            formdata.append("company_name", details?.name)
            formdata.append("phone", details?.phone)
            formdata.append("password", details?.password)
            formdata.append("password_confirmation", details?.password_confirmation)
            formdata.append("individual_number", details?.code)
            formdata.append("watsap_phone", details?.whatsapp)
            formdata.append("i_agree", details?.checkbox)
            formdata.append("role_id", '3')
            formdata.append("made_in", details?.country)
            if (selectedCities?.length) {
                selectedCities?.forEach(element => {
                    const id = element?.value?.split('^')[0]
                    formdata.append("sales_city_web[]", id)
                })
            }
            formdata.append("saite", details?.site)
            formdata.append("telegram", details?.telegram)
            formdata.append("show_room", details?.showroom)
            formdata.append("job_with_designer", details?.designer)
            formdata.append("dmodel", details?.models)
            formdata.append("about_us", description?.description)
            formdata.append("logo", file)

            fetch(`${process.env.REACT_APP_HOSTNAME}/RegisterManufacturerUser`, {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            })
                .then(response => response.json())
                .then(result => {
                    if (result.status) {
                        setOpenCode(true)
                        setToken(result?.data?.token)
                    } else if (result?.message?.includes('user@ chi ancel hamari verifykacia')) {
                        setOpenCode(true)
                        setToken(result?.token)
                    } else if (result?.data?.company_name[0].includes('The company name has already been taken.')) {
                        setErrors({
                            ...errors,
                            name: 'Производитель с таким именем уже существует',
                            phone: '',
                            whatsapp: '',
                            country: '',
                            password: '',
                            password_confirmation: '',
                            logo: '',
                            checkbox: '',
                        })
                    } else if (result?.message[0]?.includes('phone arledy exist')) {
                        setErrors({
                            ...errors,
                            name: '',
                            phone: 'Номер телефона уже зарегистрирован',
                            whatsapp: '',
                            country: '',
                            password: '',
                            password_confirmation: '',
                            logo: '',
                            checkbox: '',
                        })
                    }
                })
                .catch(error => console.log('error', error))
        }
    }

    return (
        <div className='loginPage'>
            {openCode &&
                <ConfirmCode
                    open={openCode}
                    setOpen={setOpenCode}
                    token={token}
                />
            }
            <div className='loginBlock' style={{ maxHeight: '500px', overflow: 'auto' }}>
                <div className='loginTitle'>
                    <h1>Регистрация</h1>
                    <span onClick={() => window.location = '/auth/login'}>Вход</span>
                </div>
                <div className='loginInputs'>
                    <label>Название <Asterisk /></label>
                    <input
                        value={details?.name}
                        onChange={(e) => setDetails({ ...details, name: e.target.value })}
                        style={errors?.name ? { border: '1px solid red' } : {}}
                        maxLength={52}
                    />
                    {errors?.name?.length > 0 && <span className='errorMessage'>{errors?.name}</span>}
                </div>
                <div className='loginInputs'>
                    <label>ИНН</label>
                    <input
                        type='number'
                        max={12}
                        required
                        value={details?.code}
                        onChange={(e) => (e.target.value.length < 13 && setDetails({ ...details, code: e.target.value }))}
                    />
                </div>
                <div className='loginInputs'>
                    <label>Номер телефона <Asterisk /></label>
                    <ReactInputMask
                        mask="+7 (999) 999-99-99"
                        maskChar="_"
                        value={details?.phone}
                        onChange={(e) => setDetails({ ...details, phone: e.target.value })}
                        style={errors?.phone ? { border: '1px solid red' } : {}}
                    />
                    <span className='phoneCodeRegister'>Придёт звонок с кодом</span>
                    {errors?.phone?.length > 0 && <span className='errorMessage'>{errors?.phone}</span>}
                </div>
                <div className='loginInputs'>
                    <label>Номер Whatsapp-для запроса стоимости <Asterisk /></label>
                    <ReactInputMask
                        mask="+7 (999) 999-99-99"
                        maskChar="_"
                        value={details?.whatsapp}
                        onChange={(e) => setDetails({ ...details, whatsapp: e.target.value })}
                        style={errors?.whatsapp ? { border: '1px solid red' } : {}}
                    />
                    {errors?.whatsapp?.length > 0 && <span className='errorMessage'>{errors?.whatsapp}</span>}
                </div>
                <div className='eachProfileField loginInputs'>
                    <label>Страна производства <Asterisk /></label>
                    <select className='selectCountry' value={details?.country} onChange={(e) => setDetails({ ...details, country: e.target.value })} style={errors?.country ? { border: '1px solid red' } : {}}>
                        {countries?.map(country => (
                            <option key={country?.nicename} value={country?.nicename}>
                                {country?.nicename}
                            </option>
                        ))}
                    </select>
                    {errors?.country?.length > 0 && <span className='errorMessage'>{errors?.country}</span>}
                </div>
                <div className='eachProfileField loginInputs'>
                    <label>Города (продажи продукции)({selectedCities?.length})</label>
                    <MultiSelect
                        options={cities}
                        value={selectedCities}
                        onChange={setSelectedCities}
                        labelledBy="Select"
                        overrideStrings={{
                            allItemsAreSelected: 'Все города выбраны.',
                            clearSearch: 'Очистить поиск',
                            clearSelected: 'Очистить выбранное',
                            noOptions: 'Нет выбора',
                            search: 'Поиск',
                            selectAll: 'Выбрать все',
                            selectAllFiltered: 'Выбрать все (отфильтровано)',
                            selectSomeItems: 'Выбирать...',
                        }}
                    />
                </div>
                <div className='loginInputs'>
                    <label>Сайт с ассортиментом компании</label>
                    <input
                        value={details?.site}
                        onChange={(e) => setDetails({ ...details, site: e.target.value })}
                    />
                </div>
                <div className='loginInputs'>
                    <label>Телеграм канал</label>
                    <input
                        value={details?.telegram}
                        onChange={(e) => setDetails({ ...details, telegram: e.target.value })}
                    />
                </div>
                <div className='eachProfileField loginInputs'>
                    <label>Наличие шоурума</label>
                    <select value={details?.showroom} onChange={(e) => setDetails({ ...details, showroom: e.target.value })}>
                        <option value={'Да'}>Да</option>
                        <option value={'Нет'}>Нет</option>
                    </select>
                </div>
                <div className='eachProfileField loginInputs'>
                    <label>Сотрудничаете с дизайнерами?</label>
                    <select value={details?.designer} onChange={(e) => setDetails({ ...details, designer: e.target.value })}>
                        <option value={'Да'}>Да</option>
                        <option value={'Нет'}>Нет</option>
                    </select>
                </div>
                <div className='eachProfileField loginInputs'>
                    <label>Предоставляете 3D модели?</label>
                    <select value={details?.models} onChange={(e) => setDetails({ ...details, models: e.target.value })}>
                        <option value={'Да'}>Да</option>
                        <option value={'Нет'}>Нет</option>
                    </select>
                </div>
                <div className='loginInputs'>
                    <label>О вас</label>
                    <RichTextEditor userDetails={description} setUserDetails={setDescription} />
                </div>
                <div className='loginInputs'>
                    <label>Пароль <Asterisk /></label>
                    <div className='loginPaswordInput'>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={details?.password}
                            onChange={(e) => setDetails({ ...details, password: e.target.value })}
                            style={(errors.password || loginError) ? { border: '1px solid red' } : {}}
                        />
                        <div onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <ClosedEye /> : <OpenedEye />}
                        </div>
                    </div>
                    {errors?.password?.length > 0 && <span className='errorMessage'>{errors?.password}</span>}
                </div>
                <div className='loginInputs'>
                    <label>Подтвердите пароль <Asterisk /></label>
                    <div className='loginPaswordInput'>
                        <input
                            type={show_password_confirmation ? 'text' : 'password'}
                            value={details?.password_confirmation}
                            onChange={(e) => setDetails({ ...details, password_confirmation: e.target.value })}
                            style={(errors.password_confirmation || loginError) ? { border: '1px solid red' } : {}}
                        />
                        <div onClick={() => setShow_password_confirmation(!show_password_confirmation)}>
                            {show_password_confirmation ? <ClosedEye /> : <OpenedEye />}
                        </div>
                    </div>
                    {errors?.password_confirmation?.length > 0 && <span className='errorMessage'>{errors?.password_confirmation}</span>}
                </div>
                <div className='loginInputs'>
                    <label>Загрузитье аватар/логотип <Asterisk /></label>
                    <div id='avatar' />
                    <button>
                        Загрузить
                        <input type='file' id='fileInput' onChange={handleImageChange} multiple />
                    </button>
                    {errors?.logo?.length > 0 && <span className='errorMessage'>{errors?.logo}</span>}
                </div>
                <div className='loginInputs'>
                    <div className='checkboxLine'>
                        <div className='registerCheckbox' onClick={() => setDetails({ ...details, checkbox: !details?.checkbox })}>
                            {details?.checkbox ? <RegisterCheckbox /> : ''}
                        </div>
                        <p>Согласен с правилами <span>приложения</span> и <span>политикой  конфиденциальности</span></p>
                    </div>
                    {errors?.checkbox?.length > 0 && <span className='errorMessage'>{errors?.checkbox}</span>}
                </div>
                <div className='loginButton'>
                    <button onClick={register}>Зарегистрироваться</button>
                </div>
                <div className='loginNoAccount'>
                    <p>Уже зарегистрировались?<span onClick={() => window.location = '/auth/login'}> Войти</span></p>
                </div>
            </div>
        </div>
    )
}