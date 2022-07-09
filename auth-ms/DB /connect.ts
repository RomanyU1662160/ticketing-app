const mongoose = require("mongoose");
import { config } from 'dotenv';
import { DbConnectionError } from '../src/services/ErrorHandling.service';

config()



const generateDbUrl = ():string=> {
  let dbUrl:string;
  if(process.env.DB_USE_LOCAL_MONGO==="true") {
     dbUrl = `${process.env.DB_LOCAL_BASE_URL}${process.env.DB_LOCAL_USERNAME}:${process.env.DB_LOCAL_PASSWORD}@${process.env.DB_LOCAL_SERVER}:${process.env.DB_LOCAL_PORT}`
  }else{
     dbUrl = `${process.env.DB_BASE_URL}${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_SERVER}`
  }
return dbUrl;
}


const connectDb = async () => {
const dbUrl = generateDbUrl();
console.log("dbUrl:::>>>", dbUrl)
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
