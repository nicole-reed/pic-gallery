import Head from 'next/head'
import Layout from '../components/layout'
import React, { useEffect, useState } from 'react'
import Images from '../components/Images'
import axios from 'axios'

export default function Image() {

  const [images, setImages] = useState([])

  const getImages = async () => {
    try {
      const res = await axios.get('/api/images')

      setImages(res.data.images)
    } catch (error) {
      console.log(error.message)
    }
  }
  useEffect(() => {
    getImages()
  }, [])

  return (
    <div>
      <Head>
        <title>Gallery</title>
      </Head>

      <Layout>
        <main>
          <Images images={images} setImages={setImages} />
        </main>

      </Layout>
    </div >
  )
}
