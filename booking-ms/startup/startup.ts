import ApiRouter from "../src/routes/api"
import { config } from "dotenv";

config()
const requiredEnvVariables = [
    "DB_USERNAME",
    "DB_BASE_URL",
    "DB_PASSWORD",
    "DB_SERVER",
    "DB_PORT",
]

const checkRequiredVars = () => {
    requiredEnvVariables.map((V) => {
        if (V in process.env) {
            console.log(`${V} is defined`)
        } else {
            throw new Error(`${V} is required to start ${process.env.APP_NAME}, please define in the .env file`)
        }
    })
}

const startupProxy = (app: any) => {
    checkRequiredVars()
    app.use("/", ApiRouter)
}

export default startupProxy;