import mongoose from 'mongoose'

export default mongoose.model(
  'Post',
  new mongoose.Schema({
    title: String,
    comment: String,
    userId: String,
    creation: Date
  })
)
