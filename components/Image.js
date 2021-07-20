import Link from 'next/link'
import { useState } from 'react'

const Image = ({ image, deleteImage, showDelete }) => {
    const [isHovering, setIsHovering] = useState(false);
    const handleMouseOver = () => {
        setIsHovering(true)
    }

    const handleMouseOut = () => {
        setIsHovering(false)
    }

    return (
        <div>
            <Link href={`/images/${image._id}`}>
                <div className='img-wrapper'>
                    <a onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                        <img src={image.url}></img>

                    </a>
                    {isHovering && <span className='img-caption'>{image.caption}</span>}
                    {/* {showDelete && <button className='delete-btn' onClick={() => deleteImage(image._id)}>Delete Image</button>} */}
                </div>
            </Link>
            {showDelete && <button className='delete-btn' onClick={() => deleteImage(image._id)}>Delete Image</button>}
        </div>

    )
}

export default Image