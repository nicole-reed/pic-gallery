import Image from './Image'
import Link from 'next/link'
import Masonry from 'react-masonry-css'

const Images = ({ images }) => {
    const breakpoints = {
        default: 4,
        1100: 3,
        700: 2,
        500: 1
    }
    return (
        <div className='grid'>
            <Masonry
                breakpointCols={breakpoints}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                {images.map((image) => (
                    <div>
                        <Image image={image} />
                    </div>
                ))}
            </Masonry>

        </div>
    )
}

export default Images