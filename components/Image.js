import Link from 'next/link'
import { useState } from 'react'

const Image = ({ image }) => {
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

                </div>
            </Link>
        </div>

    )
}

export default Image