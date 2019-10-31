import mongoose from 'mongoose'

export default mongoose.model('User', new mongoose.Schema({
    name: String,
    age: Number,
    profession: String,
}))