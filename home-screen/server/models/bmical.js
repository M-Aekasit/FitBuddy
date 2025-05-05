import mongoose from 'mongoose';

const bmicalSchema = new mongoose.Schema({
    name: String,
    detail:{
        type: String,
    },
    price:{
        type: Number,
    }
},{Timestamp: true});

export default mongoose.model('bmical', bmicalSchema);