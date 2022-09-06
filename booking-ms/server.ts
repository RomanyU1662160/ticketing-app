import express from "express"
import cors from "cors"
const app = express();
import { config } from "dotenv";
import connectDb from './src/DB/connect';

config()


app.use(cors())
app.use(express.json())

const port = process.env.post || 5002

const server = app.listen(port, async () => {
    await connectDb()
    console.log(`${process.env.APP_NAME} application is running on port ${port}`);
})

export default server