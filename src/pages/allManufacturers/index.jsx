import './style.css'
import { Pagination } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PageNavigation } from '../../components/pageNavigation'
import { EachManufacturer } from '../../components/eachManufacturer'
import { GetAllManufacturers } from '../../Redux/action/manufacturer_ation'
import { AllManufacturersSkeleton } from '../../components/skeletons/allManufacturers'

export const AllManufacturers = () => {
    const dispatch = useDispatch()
    const manufacturers = useSelector(st => st.Manufacturer_reducer.allManufacturers)
    const searchManufacturers = useSelector(st => st.Manufacturer_reducer.search)
    const pagination = useSelector(st => st.Manufacturer_reducer.pagination)
    const [searchText, setSearchText] = useState('')
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        dispatch(GetAllManufacturers(currentPage))
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage, dispatch])

    const handleChange = (event, value) => {
        setCurrentPage(value);
    }

    return (
        <div className='allManufacturersPage'>
            <PageNavigation
                backButton={false}
                title={'Производители'}
                navigation={false}
                search={true}
                searchText={searchText}
                setSearchText={setSearchText}
            />
            {manufacturers?.length
                ? <div className='allManufacturers'>
                    {searchText?.length > 0 && searchManufacturers?.length > 0
                        ? searchManufacturers?.map((e, i) => (
                            <EachManufacturer manufacturer={e} key={i} />
                        ))
                        : searchText?.length && !searchManufacturers?.length
                            ? <span className='notFound'>Не найдено</span>
                            : manufacturers?.length > 0
                                ? manufacturers.map((e, i) => (
                                    <EachManufacturer manufacturer={e} key={i} />
                                ))
                                : <span className='notFound'>Нет производителей</span>
                    }
                    {!searchText.length &&
                        <div className='pagination'>
                            <Pagination count={pagination?.page_count} page={pagination?.current_page} onChange={handleChange} />
                        </div>
                    }
                </div>
                : <AllManufacturersSkeleton />
            }
        </div>
    )
}