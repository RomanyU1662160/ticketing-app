import { NextFunction, Request, Response } from "express";
import { AuthenticationError } from "../src/services/ErrorHandling.service";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {

    const currentuser = req.currentUser
    if (!currentuser) {
        throw new AuthenticationError("Session expired please login")
    }

    next()

}

export default authMiddleware