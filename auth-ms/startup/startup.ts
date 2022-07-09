import AuthRouter from '../src/routes/api/auth'
import currentUserRouter from '../src/routes/api/currentUser'
import errorHandler from '../middleware/error-handling';


const startupProxy = (app: any) => {
    app.use("/", currentUserRouter)
    app.use("/", AuthRouter)
    app.use(errorHandler)   // express server error handler middleware

}

export default startupProxy