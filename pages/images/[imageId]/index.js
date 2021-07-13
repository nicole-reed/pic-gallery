import Head from 'next/head'
import { useRouter } from 'next/router'
import Layout from '../../../components/layout'
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
    return (
        <div >
            <Layout>

                <Image image={image} />
            </Layout>
        </div >
    )
}