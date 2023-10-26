import './style.css'
import { useState } from 'react'
import { MoreInfo } from '../popup/moreInfo'

export const EachProduct = ({ product, onClick, width, height, divWidth, minHeight = 140 }) => {
    const [openInfo, setOpenInfo] = useState(false)


    return (
        <div className='eachManuProduct' style={{ width: divWidth }}>
            {openInfo &&
                <MoreInfo
                    open={openInfo}
                    setOpen={setOpenInfo}
                    product={product}
                />
            }
            <img alt='' className='cursor' onClick={onClick} src={`${process.env.REACT_APP_IMAGE}${product?.product_image[0]?.image}`} style={{ width, height }} />
            <div className='moreInfo' style={{ minHeight: minHeight }}>
                <div className='eachManuProdDetails'>
                    <p>{product?.title ? product?.title : product?.name}</p>
                    {product?.facades && <span>Фасады: {product?.facades}</span>}
                    {product?.frame && <span>Корпус: {product?.frame}</span>}
                    {product?.tabletop && <span>Столешница: {product?.tabletop}</span>}
                    {product?.length && <span>Длина:<span style={{ fontFamily: 'sans-serif' }}>{product?.length}</span> м.</span>}
                    {product?.height && <span>Высота: <span style={{ fontFamily: 'sans-serif' }}>{product?.height}</span> м.</span>}
                    {product?.price && <span>Цена: <span style={{ fontFamily: 'sans-serif' }}>{product?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span> руб.</span>}
                    {product?.profile && <span>Профиль: <span style={{ fontFamily: 'sans-serif' }}>{product?.profile}</span></span>}
                </div>
                {(product?.about !== 'null' && product?.about != null && product?.about != "undefined" && product?.about != "<p><br></p>") && <button onClick={() => setOpenInfo(true)}>Подробнее</button>}
            </div>
        </div>
    )
}