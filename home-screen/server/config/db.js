import mongoose from 'mongoose';

const connectDB = async () =>{
    try{
        await mongoose.connect('mongodb://localhost:27017/fitbuddy');
        console.log('MongoDB connected');
    }catch(err){
        console.log(err);
    }
}

export default connectDB;