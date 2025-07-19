import mongoose from "mongoose"

const connectDB = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch(error){
        console.log("Error in connection to MongoDB", error);
        process.exit(1);   // 1 meanssomething wrong
    }
}

export default connectDB;
