import { Box } from '@mui/system'
import Skeleton from '@mui/material/Skeleton'

export const AllManufacturersSkeleton = () => {
    const skeleton = Array.from({ length: 3 }, (_, index) => (
        <div className='eachManufacturer' key={index}>
            <div className='eachManuTop'>
                <Skeleton animation="wave" width={100} height={100} sx={{ transform: 'none' }} />
                <div className='eachManuTopTitle'>
                    <Skeleton animation="wave" height={10} width="100px" />
                    <Skeleton animation="wave" height={10} width="50px" />
                </div>
            </div>
            <div className='eachManuCats'>
                <Skeleton animation="wave" width={80} height={35} sx={{ transform: 'none' }} />
                <Skeleton animation="wave" width={80} height={35} sx={{ transform: 'none' }} />
                <Skeleton animation="wave" width={80} height={35} sx={{ transform: 'none' }} />
                <Skeleton animation="wave" width={80} height={35} sx={{ transform: 'none' }} />
            </div>
            <div className='eachManuProds'>
                <div>
                    <Skeleton variant="rectangular" width={345} height={176} sx={{ transform: 'none' }} />
                    <Box sx={{ pt: 0.5 }}>
                        <Skeleton width="240px" />
                        <Skeleton width="170px" />
                        <Skeleton width="300px" />
                    </Box>
                </div>
                <div>
                    <Skeleton variant="rectangular" width={345} height={176} />
                    <Box sx={{ pt: 0.5 }}>
                        <Skeleton width="240px" />
                        <Skeleton width="170px" />
                        <Skeleton width="300px" />
                    </Box>
                </div>
                <div>
                    <Skeleton variant="rectangular" width={345} height={176} />
                    <Box sx={{ pt: 0.5 }}>
                        <Skeleton width="240px" />
                        <Skeleton width="170px" />
                        <Skeleton width="300px" />
                    </Box>
                </div>
            </div>
        </div>
    ))
    return (<>{skeleton}</>)
}