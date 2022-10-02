import AuthRouter from '../src/routes/api/auth'
import currentUserRouter from '../src/routes/api/currentUser'
import { errorHandlerMiddleware } from '@rooma/common-ms';
import { config } from 'dotenv';

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
    app.use("/", currentUserRouter)
    app.use("/", AuthRouter)
    app.use(errorHandlerMiddleware)   // express server error handler middleware

}

export default startupProxy