import { Image } from '../../../../models/Image'
import AWS from 'aws-sdk'
import connectDB from '../../../../middleware/mongodb'

AWS.config.update({
    credentials: new AWS.Credentials({ accessKeyId: process.env.AWS_ACCESS_KEY, secretAccessKey: process.env.AWS_SECRET }),
    region: 'us-east-1'
})

const s3 = new AWS.S3()

const handler = async (req, res) => {
    if (req.method === 'GET') {
        try {
            const { imageId } = req.query
            const image = await Image.findOne({ _id: imageId })
            console.log('image', image)

            const params = { Bucket: 'nicole-reed-gallery', Key: `${image.userId}/${image.fileName}` }
            const signedUrl = s3.getSignedUrl('getObject', params)

            res.send({ userId: image.userId, fileName: image.fileName, _id: image._id, url: signedUrl })
        } catch (error) {
            console.log(error)
            res.status(500).send(error.message)
        }
    } else {
        res.status(400).send('error', error.message)
    }
}

export default connectDB(handler)