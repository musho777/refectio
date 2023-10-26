import { Box } from '@mui/system'
import Skeleton from '@mui/material/Skeleton'

export const MyProductsSkeleton = () => {
    const skeleton = Array.from({ length: 1 }, (_, index) => (
        <div className='myProductsBlock' key={index}>
            <div className='myProductCategories'>
                <Skeleton animation="wave" width={80} height={35} sx={{ transform: 'none' }} />
                <Skeleton animation="wave" width={80} height={35} sx={{ transform: 'none' }} />
                <Skeleton animation="wave" width={80} height={35} sx={{ transform: 'none' }} />
                <Skeleton animation="wave" width={80} height={35} sx={{ transform: 'none' }} />
            </div>
            <div className='myProducts'>
                <div>
                    <Skeleton variant="rectangular" width={520} height={360} sx={{ transform: 'none' }} />
                    <Box sx={{ pt: 0.5 }}>
                        <Skeleton width="240px" />
                        <Skeleton width="170px" />
                        <Skeleton width="300px" />
                    </Box>
                </div>
                <div>
                    <Skeleton variant="rectangular" width={520} height={360} sx={{ transform: 'none' }} />
                    <Box sx={{ pt: 0.5 }}>
                        <Skeleton width="240px" />
                        <Skeleton width="170px" />
                        <Skeleton width="300px" />
                    </Box>
                </div>
                <div>
                    <Skeleton variant="rectangular" width={520} height={360} sx={{ transform: 'none' }} />
                    <Box sx={{ pt: 0.5 }}>
                        <Skeleton width="240px" />
                        <Skeleton width="170px" />
                        <Skeleton width="300px" />
                    </Box>
                </div>
                <div>
                    <Skeleton variant="rectangular" width={520} height={360} sx={{ transform: 'none' }} />
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