import { useEffect } from 'react'
import { CloseIcon } from '../../svg'

export const ManufacturerDescription = ({ open, setOpen, description }) => {
    const scrollPosition = window.scrollY || window.pageYOffset

    useEffect(() => {
        document.querySelector('.mainLayout').style.position = 'fixed'
        document.querySelector('.mainLayout').style.top = -scrollPosition
    }, [])

    function close() {
        document.querySelector('.mainLayout').style.position = 'relative'
        window.scrollTo(0, scrollPosition)
        setOpen(false)
    }

    return (
        <div className={open ? 'activePopup' : 'inactive'}>
            <div className='pop'>
                <div className='close' onClick={close}>
                    <CloseIcon />
                </div>
                {description ? <div dangerouslySetInnerHTML={{ __html: description }} /> : <span className='notFound'>У данного производителя нет доп. информации</span>}
            </div>
        </div>
    )
}