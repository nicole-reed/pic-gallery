import Image from './Image'
import Masonry from 'react-masonry-css'
import axios from 'axios'

const Images = ({ images, setImages, showDelete }) => {

    const breakpoints = {
        default: 4,
        1100: 3,
        700: 2,
        500: 1
    }
    const deleteImage = async (imageId) => {
        try {

            await axios.delete(`/api/images/${imageId}`)
            const updatedImages = [...images]
            const finalImages = updatedImages.filter(image => image._id !== imageId)

            setImages(finalImages)
        } catch (error) {
            console.log(error.message)
        }
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
                        <Image image={image} setImages={setImages} showDelete={showDelete} deleteImage={deleteImage} />
                    </div>
                ))}
            </Masonry>

        </div>
    )
}

export default Images