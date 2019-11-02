import 'dotenv/config'
import mongoose from 'mongoose'

export const HobbyEntity = mongoose.model(
  'Hobby',
  new mongoose.Schema({
    title: String,
    description: String,
    userId: String,
    status: String,
    creation: Date
  })
)

export const PersonEntity = mongoose.model(
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

export const PostEntity = mongoose.model(
  'Post',
  new mongoose.Schema({
    title: String,
    comment: String,
    userId: String,
    creation: Date
  })
)

export const UserEntity = mongoose.model(
  'User',
  new mongoose.Schema({
    name: String,
    email: String,
    profession: String,
    creation: Date
  })
)
