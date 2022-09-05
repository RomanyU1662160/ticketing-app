import { NextFunction, Request, Response } from "express";


/**
 * Express middleware to catch errors thrown by the error-handling service 
 
 */

const errorHandlerMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {

    res.locals.message = err.message
    // set errors to local when we in dev only
    res.locals.error = req.app.get("env") === "development" ? err : {}

    console.log('err.statusCode  :::>>>', err.statusCode)
    console.log('err.message  :::>>>', err.message)

    res.status(err.statusCode || 500).send(err.seralizeErrors ? err.seralizeErrors() : err.message)
    next()

}


export default errorHandlerMiddleware;
/*
note:  no need to call  next() in the above middleware 
require('express-async-errors'); in server.js  will catch async errors without adding next in the middleware
*/ 