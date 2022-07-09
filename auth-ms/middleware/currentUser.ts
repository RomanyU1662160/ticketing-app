import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";


interface UserPayload {
    id: string
    email: string;
    fname: string;
    lname: string
}
// override the Request type in Express to be able add currentUser to it 
declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload | null
        }
    }
}

const currentUserMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const sessionJwt = req.session?.jwt;
    if (!sessionJwt) {
        req.currentUser = null
    }
    try {
        const payload: UserPayload = (jwt.verify(sessionJwt, process.env.JWT_SECRET as string)) as UserPayload

        // typescript will complain as currentuser not exist in the Request interface
        // solution  override the Request type in Express as above
        req.currentUser = payload
    } catch (error: any) {
        console.log('error.message :::>>>', error.message)

    }

    next()

}

export default currentUserMiddleware