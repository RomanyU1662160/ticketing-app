import AuthRouter from '../src/routes/api/auth'
import currentUserRouter from '../src/routes/api/currentUser'
import { errorHandlerMiddleware } from '@rooma/common-ms';



const startupProxy = (app: any) => {

    app.use("/", currentUserRouter)
    app.use("/", AuthRouter)
    app.use(errorHandlerMiddleware)   // express server error handler middleware

}

export default startupProxy