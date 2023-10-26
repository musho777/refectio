import { Box } from '@mui/system'
import Skeleton from '@mui/material/Skeleton'

export const MyProfileSkeleton = () => {
    const skeleton = Array.from({ length: 1 }, (_, index) => (
        <div className='profileMiddleBlocksw' key={index}>
            {index === 0 &&
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>

                    <Skeleton variant="rectangular" width={130} height={130} sx={{ transform: 'none' }} />
                    <div className='eachItem'>
                        <Box sx={{ pt: 0.5 }}>
                            <Skeleton width="90%" height={50} sx={{ transform: 'none' }} />
                        </Box>
                    </div>
                </div>}
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div className='eachItem'>
                    <Box sx={{ pt: 0.5 }}>
                        <Skeleton width="90%" height={50} sx={{ transform: 'none' }} />
                    </Box>
                </div>
                <div className='eachItem '>
                    <Box sx={{ pt: 0.5 }}>
                        <Skeleton width="90%" height={50} sx={{ transform: 'none' }} />
                    </Box>
                </div>
            </div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div className='eachItem'>
                    <Box sx={{ pt: 0.5 }}>
                        <Skeleton width="90%" height={50} sx={{ transform: 'none' }} />
                    </Box>
                </div>
                <div className='eachItem'>
                    <Box sx={{ pt: 0.5 }}>
                        <Skeleton width="90%" height={50} sx={{ transform: 'none' }} />
                    </Box>
                </div>
            </div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div className='eachItem'>
                    <Box sx={{ pt: 0.5 }}>
                        <Skeleton width="90%" height={50} sx={{ transform: 'none' }} />
                    </Box>
                </div>
                <div className='eachItem'>
                    <Box sx={{ pt: 0.5 }}>
                        <Skeleton width="90%" height={50} sx={{ transform: 'none' }} />
                    </Box>
                </div>
            </div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div className='eachItem'>
                    <Box sx={{ pt: 0.5 }}>
                        <Skeleton width="90%" height={50} sx={{ transform: 'none' }} />
                    </Box>
                </div>
                <div className='eachItem'>
                    <Box sx={{ pt: 0.5 }}>
                        <Skeleton width="90%" height={50} sx={{ transform: 'none' }} />
                    </Box>
                </div>
            </div>
        </div>
    ))
    return (<>{skeleton}</>)
}