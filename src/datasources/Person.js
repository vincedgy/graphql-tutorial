import mongoose from 'mongoose'

export default mongoose.model(
  'Person',
  new mongoose.Schema({
    firstName: String,
    lastName: String,
    age: Number,
    profession: String,
    creation: Date,
    userId: String
  })
)
