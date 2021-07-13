import Head from 'next/head'
import Images from '../components/Images'
import Layout from '../components/layout'
import { useSession } from 'next-auth/client'
import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'

export default function Profile() {
    const [session, loading] = useSession()
    const [images, setImages] = useState([])

    const getImages = async () => {
        try {
            console.log('session', session)
            const res = await axios.get(`api/users/${session.user.id}/images`)

            setImages(res.data.images)
        } catch (error) {
            console.log(error.message)
        }
    }
    useEffect(() => {
        getImages()
    }, [])
    return (
        <div >
            <Head>
                <title>Profile</title>
            </Head>
            <Layout>

                <main>
                    <h1>This is where all the pics will be.</h1>
                </main>
                {session && <>
                    Images curated by: {session.user.name}
                </>}
                <Images images={images} setImages={setImages} />
            </Layout>
        </div>
    )
}

