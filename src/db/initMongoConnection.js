import mongoose from 'mongoose';

import dotenv from 'dotenv';

dotenv.config();
const user = process.env.MONGODB_USER;
const password = process.env.MONGODB_PASSWORD;
const url = process.env.MONGODB_URL;
const db = process.env.MONGODB_DB;

export const initMongoConnection = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${user}:${password}@${url}/${db}?retryWrites=true&w=majority&appName=Cluster0`);
    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.log(`Error connection Mongo ${error.message}`);
  }
};
