import ApiRouter from "../src/routes/api"

const startupProxy = (app: any) => {

    app.use("/", ApiRouter)
}

export default startupProxy;