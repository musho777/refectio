import './style.css'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BackButton, Search } from '../svg'
import { SearchManufacturers } from '../../Redux/action/manufacturer_ation'

export const PageNavigation = ({ title, backButton, navigation, search, onClick, searchText, setSearchText }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        searchText.length > 0 && dispatch(SearchManufacturers(searchText))
    }, [searchText, dispatch])

    return (
        <div className='pageTitle' style={navigation ? { justifyContent: 'flex-start' } : {}}>
            {title &&
                <div className='pageNavTitle' onClick={onClick}>
                    <div className='backBtn'>
                        {backButton && <BackButton />}
                    </div>
                    <h1>{title}</h1>
                </div>
            }
            <div className='pageNavigation'>
                {navigation && navigation.map((e, i) => (
                    <div className='eachNavigation' key={i}>
                        <p
                            style={i === navigation.length - 1 ? { color: '#333' } : { color: '#afafaf' }}
                            onClick={() => window.location = e?.path}
                        >
                            {e?.title}
                        </p>
                    </div>
                ))}
            </div>
            {search &&
                <div className='pageSearch'>
                    <input placeholder='Поиск...' value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                    <div className='pageSearchBg'>
                        <Search />
                    </div>
                </div>
            }
        </div>
    )
}