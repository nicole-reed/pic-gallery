import { Image } from '../../../../models/Image'
import AWS from 'aws-sdk'
import connectDB from '../../../../middleware/mongodb'
import { Record, String, Optional, Union, Literal, ValidationError } from 'runtypes'

AWS.config.update({
    credentials: new AWS.Credentials({ accessKeyId: process.env.AWS_ACCESS_KEY, secretAccessKey: process.env.AWS_SECRET }),
    region: process.env.MY_AWS_REGION
})

const s3 = new AWS.S3()

const getImageRunType = Record({
    query: Record({
        id: String
    })
})

const createImageRunType = Record({
    query: Record({
        id: String
    }),
    body: Record({
        fileName: String,
        contentType: String,
        caption: Optional(String)
    })
})

const handler = async (req, res) => {
    if (req.method === 'GET') {
        try {
            const validatedRequest = getImageRunType.check(req)
            const { id } = validatedRequest.query

            const images = await Image.find({ userId: id })

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
    } else if (req.method === 'POST') {
        try {
            console.log('inside POST users/id/images')
            const validatedRequest = createImageRunType.check(req)
            const { id } = validatedRequest.query
            const { fileName, contentType, caption } = validatedRequest.body

            const image = new Image({ userId: id, fileName, contentType, caption })

            await image.save()

            console.log('sucessfully saved image')
            res.send({ message: `successfully created image ${image.fileName}` })
        } catch (error) {
            console.log('error saving image', error)
            res.status(500).send(error.message)
        }

    } else {
        res.status(400).send(`no endpoint ${req.method} /create-image`)
    }
}

export default connectDB(handler)