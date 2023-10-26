import Skeleton from '@mui/material/Skeleton'

export const EditProductSkeleton = () => {
    const skeleton = Array.from({ length: 1 }, (_, index) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }} key={index}>
            <Skeleton variant="rectangular" width={200} height={200} sx={{ transform: 'none' }} />
            <Skeleton variant="rectangular" width={200} height={200} sx={{ transform: 'none' }} />
            <Skeleton variant="rectangular" width={200} height={200} sx={{ transform: 'none' }} />
        </div>
    ))
    return (<>{skeleton}</>)
}