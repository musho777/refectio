// import { useEffect } from 'react'
import { MyRouter } from './MyRouter'
// import { useDispatch } from 'react-redux'
// import { Logout } from './Redux/action/auth_action'

function App() {
    // const token = localStorage.getItem('token')
    // const dispatch = useDispatch()

    // useEffect(() => {
    //     if(!token && window.location.pathname !== '/auth/login') {
    //         dispatch(Logout())
    //     }
    // }, [token, dispatch])

    return <MyRouter />
}

export default App
