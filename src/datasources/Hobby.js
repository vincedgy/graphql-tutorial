import mongoose from 'mongoose'

export default mongoose.model(
  'Hobby',
  new mongoose.Schema({
    title: String,
    description: String,
    userId: String,
    creation: Date
  })
)
