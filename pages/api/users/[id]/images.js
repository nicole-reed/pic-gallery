import { Image } from '../../../../models/Image'
import connectDB from '../../../../middleware/mongodb'

const handler = async (req, res) => {
    if (req.method === 'POST') {
        try {
            const { id } = req.query
            const { fileName, contentType } = req.body
            console.log(req.body)

            const image = new Image({ userId: id, fileName, contentType })
            console.log('image', image)
            await image.save()

            res.send(`successfully created image ${image.fileName}`)
        } catch (error) {
            console.log(error)
            res.status(500).send(error.message)
        }

    } else {
        res.status(400).send(`no endpoint ${req.method} /create-image`)
    }
}

export default connectDB(handler)