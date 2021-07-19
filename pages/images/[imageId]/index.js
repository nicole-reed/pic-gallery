
import { useRouter } from 'next/router'
import Layout from '../../../components/Layout'
import React, { useEffect, useState } from 'react'
import Image from '../../../components/Image'
import axios from 'axios'

export default function fullImage() {
    const router = useRouter()
    const { imageId } = router.query

    const [image, setImage] = useState({})

    const getImage = async () => {
        try {
            const res = await axios.get(`/api/images/${imageId}`)

            setImage(res.data)
        } catch (error) {
            console.log(error.message)
        }
    }
    useEffect(() => {
        imageId && getImage()
    }, [imageId])

    const downloadImage = () => {
        window.open(image.fullUrl, { target: '_blank' })
    }

    return (
        <div >
            <Layout>
                <main>
                    <Image image={image} />
                </main>


                <button className='download-btn' onClick={downloadImage}>Download Full Quality Image</button>
            </Layout>
        </div >
    )
}