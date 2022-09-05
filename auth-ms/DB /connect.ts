const mongoose = require("mongoose");
import { config } from 'dotenv';
import { DbConnectionError } from '@rooma/common-ms';

config()



const generateDbUrl = (): string => {
  let dbUrl: string;
  console.log("process.env.NODE_ENV in Connect DB )::>>>", process.env.NODE_ENV)
  if (process.env.DB_USE_LOCAL_MONGO == "true") {
    console.log("It is test environment in Connect DB )::>>>", process.env.NODE_ENV)
    dbUrl = `${process.env.DB_LOCAL_BASE_URL}${process.env.DB_LOCAL_USERNAME}:${process.env.DB_LOCAL_PASSWORD}@${process.env.DB_LOCAL_SERVER}:${process.env.DB_LOCAL_PORT}`
  } else {
    console.log("It is NOT test environment in Connect DB )::>>>")
    dbUrl = `${process.env.DB_BASE_URL}${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_SERVER}`
  }
  console.log("dbUrl::>>>", dbUrl)
  return dbUrl;
}


const connectDb = async () => {
  const dbUrl = generateDbUrl();

  try {
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,

    });
    console.log("mongoose connected");
  } catch (error: any) {
    console.log(error.message);
    throw new DbConnectionError(error.message)
  }
};


export default connectDb
