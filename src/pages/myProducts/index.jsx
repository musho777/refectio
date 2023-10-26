import './style.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EachProduct } from '../../components/eachProduct'
import { PageNavigation } from '../../components/pageNavigation'
import { SingleProduct } from '../../components/popup/singleProduct'
import { MyProductsSkeleton } from '../../components/skeletons/myProducts'
import { AllMyProducts, DeleteProduct, FilterCategories } from '../../Redux/action/product_action'

export const MyProducts = () => {
    const dispatch = useDispatch()
    const products = useSelector(st => st.Product_reducer.myProducts)
    const filteredProducts = useSelector(st => st.Product_reducer.filteredProducts)
    const update = useSelector(st => st.Product_reducer.update)
    const categories = useSelector(st => st.Product_reducer.myCategories)
    const [myCategories, setMyCategories] = useState([])
    const [openSingleProductPopup, setOpenSingleProductPopup] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [productsToShow, setProductsToShow] = useState(products)
    useEffect(() => {
        dispatch(AllMyProducts())
    }, [update, dispatch])

    useEffect(() => {
        if (categories) {
            let category = []
            categories.forEach(element => {
                category.push({ selected: false, name: element.parent_category_name, id: element.parent_category_id })
            })
            setMyCategories(category)
        }
    }, [categories])

    useEffect(() => {
        if (myCategories?.every(e => e.selected === false)) {
            setProductsToShow(products)
        } else {
            myCategories?.forEach(element => {
                element?.selected && dispatch(FilterCategories(element?.name))
            })
            setProductsToShow(filteredProducts)
        }
    }, [myCategories, filteredProducts, products, dispatch])

    const toggleCategorySelection = categoryId => {
        setMyCategories(prevCategories =>
            prevCategories?.map(category => ({
                ...category,
                selected: category?.id === categoryId ? !category?.selected : false,
            }))
        )
    }

    function deleteProduct(id) {
        const agree = window.confirm('Вы действительно хотите удалить этот продукт?')
        agree && dispatch(DeleteProduct([id]))
    }

    function handleClick(e) {
        setSelectedProduct(e)
        setOpenSingleProductPopup(true)
    }

    return (
        <div className='myProductsPage'>
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
                    },
                    {
                        title: 'Каталог',
                        path: '/my-products'
                    }
                ]}
            />
            {openSingleProductPopup &&
                <SingleProduct
                    open={openSingleProductPopup}
                    setOpen={setOpenSingleProductPopup}
                    product={selectedProduct}
                />
            }
            {(products.length || filteredProducts.length) && categories
                ? <div className='myProductsBlock'>
                    <div className='myProductCategories'>
                        {myCategories?.map((e, i) => (
                            <button
                                key={i}
                                className='eachProductCategory'
                                style={e?.selected ? { background: 'var(--2-d-9-efb, #2D9EFB)', color: '#fff' } : {}}
                                onClick={() => toggleCategorySelection(e.id)}
                            >
                                {e?.name}
                            </button>
                        ))}
                    </div>
                    <div className='myProducts'>
                        {productsToShow.length > 0
                            ? productsToShow?.map((e, i) => {
                                let count = 0
                                let count1 = 0
                                let productCount1 = false
                                let productCount2 = false
                                Object.values(productsToShow[i]).map((elm, i) => {
                                    if (!elm) {
                                        count = count + 1
                                    }
                                    if (count > 7) {
                                        productCount1 = true
                                    }
                                    else {
                                        productCount1 = false
                                    }
                                })

                                if (i != 0) {
                                    Object.values(productsToShow[i - 1]).map((elm, i) => {
                                        if (!elm) {
                                            count1 = count1 + 1
                                        }
                                        if (count1 > 7) {
                                            productCount2 = true
                                        }
                                        else {
                                            productCount2 = false
                                        }
                                    })
                                }
                                if (i != productsToShow.length - 1) {
                                    if (i % 2 == 0) {
                                        Object.values(productsToShow[i + 1]).map((elm, i) => {
                                            if (!elm) {
                                                count1 = count1 + 1
                                            }
                                            if (count1 > 7) {
                                                productCount2 = true
                                            }
                                            else {
                                                productCount2 = false
                                            }
                                        })
                                    }
                                }

                                let minHeight = 0
                                if (productCount1 && productCount2) {
                                    minHeight = 60
                                }
                                else {
                                    minHeight = 140
                                }
                                if (i === productsToShow.length - 1) {
                                    if (productsToShow.length % 2 == 1) {
                                        Object.values(productsToShow[i]).map((elm, i) => {
                                            if (!elm) {
                                                count1 = count1 + 1
                                            }
                                            if (count1 > 7) {
                                                minHeight = 60
                                            }
                                            else {
                                                minHeight = 140
                                            }
                                        })

                                    }
                                }

                                return <div key={i} className='eachProduct'>
                                    <EachProduct minHeight={minHeight} product={e} onClick={() => handleClick(e)} width={'100%'} divWidth={'100%'} />
                                    <div className='eachProductButtons'>
                                        <button onClick={() => window.location = `/edit/${e?.id}`}>Редактировать</button>
                                        <button onClick={() => deleteProduct(e?.id)}>Удалить</button>
                                    </div>
                                </div>
                            })
                            : <span>Нет товаров</span>
                        }
                    </div>
                    <div className='myProductsButton'>
                        <button onClick={() => window.location = '/addNewProduct'}>Добавить</button>
                    </div>
                </div>
                : !products?.length && !categories?.length
                    ? <div className='myProducts' style={{ minHeight: 'calc(100vh - 462px)' }}>
                        <span>Нет товаров</span>
                        <div className='myProductsButton'>
                            <button onClick={() => window.location = '/addNewProduct'}>Добавить</button>
                        </div>
                    </div>
                    : <MyProductsSkeleton />
            }
        </div>
    )
}