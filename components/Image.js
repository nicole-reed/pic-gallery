import Link from 'next/link'

const Image = ({ image }) => {
    return (
        <div>
            <Link href={`/images/${image._id}`}>
                <a>
                    <img src={image.url}></img>
                </a>
            </Link>

        </div>



    )
}

export default Image