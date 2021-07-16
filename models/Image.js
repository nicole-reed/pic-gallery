import { Schema, model, models } from 'mongoose'


const ImageSchema = new Schema({
    userId: { type: String },
    fileName: { type: String },
    contentType: { type: String },
    caption: { type: String }
})


export const Image = models.Image || model('Image', ImageSchema)
