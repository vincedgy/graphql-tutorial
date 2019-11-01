import mongoose from 'mongoose'

export default mongoose.model(
  'Post',
  new mongoose.Schema({
    comment: String,
    userId: String,
    creation: Date
  })
)
