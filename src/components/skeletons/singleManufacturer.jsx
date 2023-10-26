import { Box } from '@mui/system'
import Skeleton from '@mui/material/Skeleton'

export const SingleManufacturerSkeleton = () => {
    const skeleton = Array.from({ length: 1 }, (_, index) => (
        <div key={index}>
            <div className='singleManuBlock' style={{ marginBottom: '20px' }}>
                <div className='singleManuDetails'>
                    <div className='singleManuDetailsLeft'>
                        <Skeleton animation="wave" width={120} height={120} sx={{ transform: 'none' }} />
                        <div className='singleManuDetailsLeftRight'>
                            <Skeleton animation="wave" height={10} width={100} sx={{ transform: 'none' }} />
                            <Skeleton animation="wave" height={10} width={50} sx={{ transform: 'none' }} />
                            <div className='singleManuDeailsIcons'>
                                <Skeleton animation="wave" width={24} height={24} sx={{ transform: 'none' }} />
                                <Skeleton animation="wave" width={24} height={24} sx={{ transform: 'none' }} />
                                <Skeleton animation="wave" width={24} height={24} sx={{ transform: 'none' }} />
                            </div>
                        </div>
                    </div>
                    <div className='singleManuDetailsRight'>
                        <div className='singleManuDetailsRightCheckbox'>
                            <Skeleton animation="wave" width={90} height={20} sx={{ transform: 'none' }} />
                        </div>
                        <div className='singleManuDetailsRightIcons'>
                            <Skeleton animation="wave" width={90} height={70} sx={{ transform: 'none' }} />
                            <Skeleton animation="wave" width={90} height={70} sx={{ transform: 'none' }} />
                            <Skeleton animation="wave" width={90} height={70} sx={{ transform: 'none' }} />
                        </div>
                    </div>
                </div>
                <div className='myProductCategories'>
                    <Skeleton animation="wave" width={70} height={30} sx={{ transform: 'none' }} />
                    <Skeleton animation="wave" width={70} height={30} sx={{ transform: 'none' }} />
                    <Skeleton animation="wave" width={70} height={30} sx={{ transform: 'none' }} />
                    <Skeleton animation="wave" width={70} height={30} sx={{ transform: 'none' }} />
                    <Skeleton animation="wave" width={70} height={30} sx={{ transform: 'none' }} />
                </div>
            </div>
            <div className='singleManuBlock'>
                <div className='singleManuFilter'>
                    <Skeleton animation="wave" width={250} height={40} sx={{ transform: 'none' }} />
                </div>
                <div className='singleManuProducts'>
                    <div>
                        <Skeleton variant="rectangular" width={345} height={176} sx={{ transform: 'none' }} />
                        <Box sx={{ pt: 0.5 }}>
                            <Skeleton width="240px" />
                            <Skeleton width="170px" />
                            <Skeleton width="300px" />
                        </Box>
                    </div>
                    <div>
                        <Skeleton variant="rectangular" width={345} height={176} sx={{ transform: 'none' }} />
                        <Box sx={{ pt: 0.5 }}>
                            <Skeleton width="240px" />
                            <Skeleton width="170px" />
                            <Skeleton width="300px" />
                        </Box>
                    </div>
                    <div>
                        <Skeleton variant="rectangular" width={345} height={176} sx={{ transform: 'none' }} />
                        <Box sx={{ pt: 0.5 }}>
                            <Skeleton width="240px" />
                            <Skeleton width="170px" />
                            <Skeleton width="300px" />
                        </Box>
                    </div>
                    <div>
                        <Skeleton variant="rectangular" width={345} height={176} sx={{ transform: 'none' }} />
                        <Box sx={{ pt: 0.5 }}>
                            <Skeleton width="240px" />
                            <Skeleton width="170px" />
                            <Skeleton width="300px" />
                        </Box>
                    </div>
                    <div>
                        <Skeleton variant="rectangular" width={345} height={176} sx={{ transform: 'none' }} />
                        <Box sx={{ pt: 0.5 }}>
                            <Skeleton width="240px" />
                            <Skeleton width="170px" />
                            <Skeleton width="300px" />
                        </Box>
                    </div>
                    <div>
                        <Skeleton variant="rectangular" width={345} height={176} sx={{ transform: 'none' }} />
                        <Box sx={{ pt: 0.5 }}>
                            <Skeleton width="240px" />
                            <Skeleton width="170px" />
                            <Skeleton width="300px" />
                        </Box>
                    </div>
                </div>
            </div>
        </div>
    ))
    return (<>{skeleton}</>)
}