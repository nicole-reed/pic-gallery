import { Image } from '../../../../models/Image'
import AWS from 'aws-sdk'
import connectDB from '../../../../middleware/mongodb'

AWS.config.update({
    credentials: new AWS.Credentials({ accessKeyId: process.env.MY_ACCESS_KEY, secretAccessKey: process.env.MY_SECRET }),
    region: process.env.MY_REGION
})

const s3 = new AWS.S3()

const handler = async (req, res) => {
    if (req.method === 'GET') {
        try {
            const { imageId } = req.query
            const image = await Image.findOne({ _id: imageId })
            console.log('image', image)

            const mediumParams = { Bucket: 'nicole-reed-gallery', Key: `${image.userId}/medium-${image.fileName}` }
            const mediumSignedUrl = s3.getSignedUrl('getObject', mediumParams)


            const fullParams = { Bucket: 'nicole-reed-gallery', Key: `${image.userId}/${image.fileName}` }
            const fullSignedUrl = s3.getSignedUrl('getObject', fullParams)

            res.send({ userId: image.userId, fileName: image.fileName, _id: image._id, url: mediumSignedUrl, caption: image.caption, fullUrl: fullSignedUrl })
        } catch (error) {
            console.log(error)
            res.status(500).send(error.message)
        }
    } else if (req.method === 'DELETE') {
        try {
            const { imageId } = req.query
            const image = await Image.findOne({ _id: imageId })
            console.log('image', image)

            if (!image) {
                throw new Error(`image with _id ${id} does not exist`)
            }

            await image.deleteOne()

            res.send('image successfully deleted')
        } catch (error) {
            console.log('unable to delete', error)
        }
    } else {
        res.status(400).send('error', error.message)
    }
}

export default connectDB(handler)