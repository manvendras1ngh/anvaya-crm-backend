import mongoose from "mongoose";

export const instantiateConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connection to database successfull!");
  } catch (error) {
    console.error("Error connecting to database", error);
  }
};
