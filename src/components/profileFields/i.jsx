import './style.css'
import { EditIcon } from '../svg'
import RichTextEditor from '../editor'
import { useEffect, useState } from 'react'
import { EditPhone } from '../popup/editPhone'
import { EditPassword } from '../popup/editPassword'
import { useDispatch, useSelector } from 'react-redux'
import { MyProfileSkeleton } from '../skeletons/myProfile'
import { MultiSelect } from 'react-multi-select-component'
import { GetCategories, GetCities, UpdateAbout, UpdateCities, UpdateCode, UpdateCountry, UpdateName, UpdatePhone, UpdateSite, UpdateSuccessful, UpdateTelegram } from '../../Redux/action/myProfile_action'

export const ProfileFields = () => {
    const dispatch = useDispatch()
    const updateSuccess = useSelector(st => st.MyProfile_reducer.update)
    const cities = useSelector(st => st.MyProfile_reducer.cities)
    const nameError = useSelector(st => st.MyProfile_reducer.nameError)
    // const categories = useSelector(st => st.MyProfile_reducer.categories)
    const user = useSelector(st => st.MyProfile_reducer.user)
    const [openPassword, setOpenPassword] = useState(false)
    const [openPhone, setOpenPhone] = useState(false)
    const [file, setFile] = useState()
    // const [cityId, setCityId] = useState([])
    const [selected, setSelected] = useState([])
    const [myCities, setMyCities] = useState([])
    const [edit, setEdit] = useState({
        country: false,
        code: false,
        cities: false,
        description: false,
        name: false,
        telegram: false,
        site: false,
        phone: false,
        password: false,
        categories: false
    })
    const [userDetails, setUserDetails] = useState({
        country: '',
        code: '',
        cities: [],
        description: '',
        name: '',
        telegram: '',
        site: '',
        phone: '',
        password: '',
        categories: ''
    })

    useEffect(() => {
        dispatch(GetCities())
        dispatch(GetCategories())
    }, [dispatch])

    useEffect(() => {
        if (user) {
            setFile(`${process.env.REACT_APP_IMAGE}${user?.logo}`)
            const city = []
            user?.city_of_sales_manufacturer?.forEach(elm => {
                city.push({ label: elm?.city_name, value: `${elm?.city_id}^${elm?.city_name}` })
            })
            setSelected(city)
            setUserDetails({
                country: user?.made_in,
                code: user?.individual_number,
                cities: city,
                description: user?.about_us,
                name: user?.company_name,
                telegram: user?.telegram,
                site: user?.saite,
                phone: user?.phone,
                password: '',
                categories: user?.user_category_product
            })
        }
    }, [user, openPhone])

    useEffect(() => {
        if (updateSuccess) {
            setEdit({
                country: false,
                code: false,
                cities: false,
                description: false,
                name: false,
                telegram: false,
                site: false,
                phone: false,
                password: false,
                categories: false
            })
            dispatch(UpdateSuccessful())
        }
    }, [updateSuccess, dispatch])

    function uploadSingleFile(e) {
        if (e.target.files.length) {
            const token = localStorage.getItem('token')
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);
            const formdata = new FormData();
            formdata.append("logo", e.target.files[0]);

            fetch(`${process.env.REACT_APP_HOSTNAME}/updateLogoProizvoditel`, {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            })
                .then(response => response.json())
                .then(result => result.status && setFile(URL.createObjectURL(e.target.files[0])))
                .catch(error => console.log('error', error));
        }
    }

    useEffect(() => {
        let cities = []
        selected?.forEach(element => {
            cities.push(element.value)
        })
        setMyCities(cities)
    }, [selected])

    return (<>
        {openPassword &&
            <EditPassword
                open={openPassword}
                setOpen={setOpenPassword}
            />
        }
        {openPhone &&
            <EditPhone
                open={openPhone}
                setOpen={setOpenPhone}
            />
        }
        {Object.keys(user).length
            ? <div className='myProfileBlock'>
                <div className='profileMiddleBlocks'>
                    <div className='profileNameBlock'> {/* avatar */}
                        <img alt='' src={file} />
                        <button className='profileEditButton'>
                            Изменить
                            <input type='file' id='fileInput' onChange={uploadSingleFile} />
                        </button>
                    </div>
                    <div className='eachProfileField'> {/* Страна производства */}
                        <div className='profileFieldName'>
                            <span>Страна производства</span>
                            <div className='cursor' onClick={() => setEdit({ ...edit, country: true })}>
                                <EditIcon />
                            </div>
                        </div>
                        <input
                            disabled={!edit.country}
                            value={userDetails?.country ? userDetails?.country : ''}
                            style={!userDetails?.country?.length ? { border: '1px solid red' } : edit.country ? { border: '3px solid #bebebe' } : { border: '1px solid #bebebe' }}
                            onChange={(e) => setUserDetails({ ...userDetails, country: e.target.value })}
                        />
                    </div>
                    {edit?.country && <div>
                        <button className='profileEditButton' onClick={() => userDetails?.country.length > 0 ? dispatch(UpdateCountry(userDetails?.country)) : setEdit({ ...edit, country: false })}>Обновить</button>
                    </div>}
                    <div className='eachProfileField'> {/* ИНН */}
                        <div className='profileFieldName'>
                            <span>ИНН</span>
                            <div className='cursor' onClick={() => setEdit({ ...edit, code: true })}>
                                <EditIcon />
                            </div>
                        </div>
                        <input
                            disabled={!edit.code}
                            value={userDetails?.code ? userDetails?.code : ''}
                            style={edit.code ? { border: '3px solid #bebebe' } : { border: '1px solid #bebebe' }}
                            onChange={(e) => setUserDetails({ ...userDetails, code: e.target.value })}
                        />
                    </div>
                    {edit?.code && <div>
                        <button className='profileEditButton' onClick={() => userDetails?.code?.length > 0 ? dispatch(UpdateCode(userDetails?.code)) : setEdit({ ...edit, code: false })}>Обновить</button>
                    </div>}
                    <div className='eachProfileField'> {/* Города */}
                        <div className='profileFieldName'>
                            <span>Города (продажи продукции)({userDetails?.cities?.length})</span>
                            <div className='cursor' onClick={() => setEdit({ ...edit, cities: true })}>
                                <EditIcon />
                            </div>
                        </div>
                        <MultiSelect
                            options={cities}
                            value={selected}
                            onChange={setSelected}
                            labelledBy="Select"
                            disabled={!edit.cities}
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
                    {edit?.cities && <div>
                        <button className='profileEditButton' onClick={() => dispatch(UpdateCities(myCities))}>Обновить</button>
                    </div>}
                    <div className='eachProfileField'> {/* Доп. информация */}
                        <div className='profileFieldName'>
                            <span>Доп. информация</span>
                            <div className='cursor' onClick={() => setEdit({ ...edit, description: true })}>
                                <EditIcon />
                            </div>
                        </div>
                        {edit?.description
                            ? <RichTextEditor userDetails={userDetails} setUserDetails={setUserDetails} />
                            : <div className='aboutBlock' dangerouslySetInnerHTML={{ __html: userDetails?.description }} />
                        }
                    </div>
                    {edit?.description && <div>
                        <button className='profileEditButton' onClick={() => dispatch(UpdateAbout(userDetails?.description))}>Обновить</button>
                    </div>}
                </div>
                <div className='profileMiddleBlocks'>
                    <div id='eachItem' className='eachProfileField'> {/* Название */}
                        <div className='profileFieldName'>
                            <span>Название</span>
                            <div className='cursor' onClick={() => setEdit({ ...edit, name: true })}>
                                <EditIcon />
                            </div>
                        </div>
                        <input
                            disabled={!edit.name}
                            value={userDetails?.name ? userDetails?.name : ''}
                            style={(nameError.length || !userDetails?.name?.length) ? { border: '1px solid red' } : edit.name ? { border: '3px solid #bebebe' } : { border: '1px solid #bebebe' }}
                            onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
                        />
                        {nameError && <span style={{ color: 'red' }}>{nameError}</span>}
                    </div>
                    {edit?.name && <div>
                        <button className='profileEditButton' onClick={() => userDetails?.name?.length > 0 && dispatch(UpdateName(userDetails?.name))}>Обновить</button>
                    </div>}
                    <div className='eachProfileField'> {/* Телеграм Канал */}
                        <div className='profileFieldName'>
                            <span>Телеграм Канал</span>
                            <div className='cursor' onClick={() => setEdit({ ...edit, telegram: true })}>
                                <EditIcon />
                            </div>
                        </div>
                        <input
                            disabled={!edit.telegram}
                            value={userDetails?.telegram ? userDetails?.telegram : ''}
                            style={edit.telegram ? { border: '3px solid #bebebe' } : { border: '1px solid #bebebe' }}
                            onChange={(e) => setUserDetails({ ...userDetails, telegram: e.target.value })}
                        />
                    </div>
                    {edit?.telegram && <div>
                        <button className='profileEditButton' onClick={() => userDetails?.telegram?.length > 0 ? dispatch(UpdateTelegram(userDetails?.telegram)) : setEdit({ ...edit, telegram: false })}>Обновить</button>
                    </div>}
                    <div className='eachProfileField'> {/* Сайт */}
                        <div className='profileFieldName'>
                            <span>Сайт</span>
                            <div className='cursor' onClick={() => setEdit({ ...edit, site: true })}>
                                <EditIcon />
                            </div>
                        </div>
                        <input
                            disabled={!edit.site}
                            value={userDetails?.site ? userDetails?.site : ''}
                            style={edit.site ? { border: '3px solid #bebebe' } : { border: '1px solid #bebebe' }}
                            onChange={(e) => setUserDetails({ ...userDetails, site: e.target.value })}
                        />
                    </div>
                    {edit?.site && <div>
                        <button className='profileEditButton' onClick={() => userDetails?.site?.length > 0 ? dispatch(UpdateSite(userDetails?.site)) : setEdit({ ...edit, site: false })}>Обновить</button>
                    </div>}
                    <div className='eachProfileField'> {/* Номер телефона */}
                        <div className='profileFieldName'>
                            <span>Номер телефона</span>
                            <div className='cursor' onClick={() => setOpenPhone(true)}>
                                <EditIcon />
                            </div>
                        </div>
                        <input
                            disabled
                            value={userDetails?.phone ? userDetails?.phone : ''}
                        />
                    </div>
                    {edit?.phone && <div>
                        <button className='profileEditButton' onClick={() => dispatch(UpdatePhone(userDetails?.phone))}>Обновить</button>
                    </div>}
                    <div className='eachProfileField'> {/* Пароль */}
                        <div className='profileFieldName'>
                            <span>Пароль</span>
                            <div className='cursor' onClick={() => setOpenPassword(true)}>
                                <EditIcon />
                            </div>
                        </div>
                        <input
                            disabled
                            value={''}
                        />
                    </div>
                </div>
            </div>
            : <div className='myProfileBlock'>
                <MyProfileSkeleton />
            </div>
        }
    </>)
}