import mongoose from "mongoose";
const {connect}=mongoose;
export const connectDB=async()=>{
    try {
        const Instance=await connect("mongodb://localhost:27017/chattyy");
        console.log("\nMONGODB connected !! ");
    } catch (error) {
        console.log("MONGODB connection error");
        process.exit(1);
    }
}
// DOCUMENTATION 
// 1.import mongoose 
// 2.get connect func from mongoose
// 3.create and export connectDB async function using connect with uri parameter to get DB instance also error handling 
