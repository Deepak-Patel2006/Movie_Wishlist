import mongoose from "mongoose";

export const connect = async()=>{
    try {
        
        await mongoose.connect(process.env.mongo_key);
        console.log("Database connected ✔✔✔");
        

    } catch (error) {
        console.log("Database connection failed ❌❌❌ ", error.message);
        process.exit(1);
    }
}
