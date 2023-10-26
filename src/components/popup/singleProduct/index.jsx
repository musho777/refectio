import './style.css'
import { useEffect } from 'react'
import { CloseIcon } from '../../svg'
import { Carousel } from 'react-responsive-carousel'
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css'

export const SingleProduct = ({ open, setOpen, product }) => {
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
            <div className='pop' style={{ height: '100vh' }}>
                <div className='close' onClick={close}>
                    <CloseIcon />
                </div>
                {/* <div className='eachSingleProdDetails'> */}
                <Carousel
                    style={styles}
                    showThumbs={false}
                    showStatus={false}
                    showIndicators={product?.product_image?.length !== 1}
                >
                    {product?.product_image?.length > 0 && product?.product_image?.map((e, i) => (
                        <img alt='' key={i} src={`${process.env.REACT_APP_IMAGE}${e.image}`} className='carouselImages' />
                    ))}
                </Carousel>
                {/* </div> */}
                {/* <div className='eachSingleProdDetails'>
                    <div className='eachManuProduct'>
                        <div className='eachManuProdDetails'>
                            <p>{product?.name}</p>
                            {product?.facades && <span>Фасады: {product?.facades}</span>}
                            {product?.frame && <span>Корпус: {product?.frame}</span>}
                            {product?.tabletop && <span>Столешница: {product?.tabletop}</span>}
                            {product?.length && <span>Длина: {product?.length} м.</span>}
                            {product?.height && <span>Высота: {product?.height} м.</span>}
                            {product?.price && <span>Цена: {product?.price}</span>}
                            {product?.about && <span className='about' dangerouslySetInnerHTML={{ __html: `Доп. информация: ${product?.about}` }} />}
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    )
}