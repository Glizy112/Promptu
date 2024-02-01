import mongoose from "mongoose";

let isConnected = false;  //track the db connection status

export const connectToDB =async()=> {
    mongoose.set('strictQuery', true);

    if(isConnected) {
        console.log('MongoDb is already connected');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "prompt_sharing",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        isConnected = true;
        console.log('MongoDB Connected');
    } catch (error) {
        console.log(error);
    }
}