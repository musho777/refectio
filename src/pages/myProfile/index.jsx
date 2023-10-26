import './style.css'
import { useDispatch } from 'react-redux'
import { Logout } from '../../Redux/action/auth_action'
import { ProfileFields } from '../../components/profileFields'
import { PageNavigation } from '../../components/pageNavigation'

export const MyProfile = () => {
    const dispatch = useDispatch()
    return (
        <div className='myProfilePage'>
            <PageNavigation
                backButton={false}
                title={false}
                search={false}
                searchText={''}
                setSearchText={''}
                navigation={[
                    {
                        title: 'Профиль',
                        path: '/profile'
                    }
                ]}
            />
            <div className='profileBlock'>
                <ProfileFields />
                <div className='profileButton'>
                    <button onClick={() => window.location = '/my-products'}>Мои товары</button>
                    <button onClick={() => dispatch(Logout())}>Выйти</button>
                </div>
            </div>
        </div>
    )
}