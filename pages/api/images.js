import { Image } from '../../models/Image'
import AWS from 'aws-sdk'
import connectDB from '../../middleware/mongodb'

AWS.config.update({
    credentials: new AWS.Credentials({ accessKeyId: process.env.MY_ACCESS_KEY, secretAccessKey: process.env.MY_SECRET }),
    region: process.env.MY_REGION
})

const s3 = new AWS.S3()

const handler = async (req, res) => {
    if (req.method === 'GET') {
        try {
            const images = await Image.find()

            const imagesWithUrls = images.map(image => {
                const params = { Bucket: 'nicole-reed-gallery', Key: `${image.userId}/small-${image.fileName}` }
                const signedUrl = s3.getSignedUrl('getObject', params)

                const result = { userId: image.userId, fileName: image.fileName, _id: image._id, url: signedUrl, caption: image.caption }
                return result
            })

            res.send({ images: imagesWithUrls })
        } catch (error) {
            console.log(error)
            res.status(500).send(error.message)
        }
    } else {
        res.status(400).send('error', error.message)
    }
}

export default connectDB(handler)