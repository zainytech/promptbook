import mongoose from "mongoose";

let isConnected = false; //track connection status
// console.log("indb")

export const connectToDB = async() =>{
//   console.log("indb1:",process.env.MONGODB_URI)
    mongoose.set('strictQuery',true);
    if(isConnected){
        console.log("mongodb is already connected");
        return;
    }

    try{
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName:"share_prompt",
            useNewUrlParser : true,
            useUnifiedTopology: true, 
            //these are deprecated
        })
        isConnected=true;
        console.log("mongodb connected")
    } catch (error){
        console.log(error);
    }
}
