import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  console.log('start up');
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_LEY not in environment');
  }

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI not in environment');
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('connect to mongoo db');
  } catch (err) {
    console.log(err);
  }

  app.listen(3000, () => {
    console.log("Listening on port 3000!!!!!!");
  });
};

start();
