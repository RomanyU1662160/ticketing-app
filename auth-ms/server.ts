require('express-async-errors'); // required to  catch async errors without adding next in the middleware
import express from 'express';
import { config } from 'dotenv';

import cors from 'cors';
import connectDb from './DB /connect';
import { urlencoded } from 'body-parser';
import startupProxy from './startup/startup';
import cookieSession from 'cookie-session'
import authMiddleware from './middleware/currentUser';
import ConfigSingelton from './src/services/configService';


config();
connectDb();

const app = express();
app.use(urlencoded({ extended: false }));
// app.set('trust proxy', true) // express servere will trust ingress-nginix proxy fro m the k8s
// app.use(authMiddleware)
app.use(cors());
app.use(express.json());
app.use(cookieSession({    // middleware from cookie-session library to set sessions in the request
  secure: false, // accept https only- must set trust-proxy to true as above
  signed: false   // not encrypt passed jwt token 
}))


startupProxy(app);
// const port = ConfigSingelton.getInstance().getKey("PORT")
const port = process.env.PORT || 5001;

//const port2 = process.env.PORT
const server = app.listen(port, () => {
  console.log(`${process.env.APP_NAME} application is running on port ${port}`);
})

export default server;