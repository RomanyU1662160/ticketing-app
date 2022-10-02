import { NextFunction, Request, Response } from "express";

import User from "../../models/User";

import express from 'express';

import Validator from 'validatorjs';

import checkPassComplexity from "../../helpers/passwordComplexity";
import _ from "lodash";

import validateLogin from "../../validations/loginValidator";
import { authMiddleware, Password, PasswordComplexityError, AuthenticationError, ValidationError } from "@rooma/common-ms";



const router = express.Router();

router.get("/login", authMiddleware, (req: Request, res: Response) => {
    try {
        res.send("welcome to login page.")

    } catch (error: any) {
        res.send(error.message)
    }

})



router.post("/login/submit", async (req: Request, res: Response, next: NextFunction) => {
    console.log('req.body ::::>>>', req.body)

    // 1- validate email and password is in the body 
    const validation = validateLogin(req.body)
    if (validation.fails()) {
        return res.status(500).send(validation.errors)
    }

    const { email, password } = req.body;
    // 2- check if user with this email is exist

    const foundedUser = await User.findOne({ email });
    if (!foundedUser) throw new AuthenticationError(` user with email ${email} cannot be  not found`)

    // 3- check if password is matched with foundedUser
    const matched = await Password.compare(foundedUser?.password!, password);
    if (!matched) throw new AuthenticationError("password not match our records")

    // 4- generate token if user is founded (payload include foundedUser)

    const token = foundedUser?.generateToken(360000)

    // 5- set the token in req.session {jwt: token}
    // set the token in the res.header { x-auth-token: token} 
    if (token) {
        req.session!.jwt = token      // set the token in the session-cookie header
        res.header("x_auth_token", token)    // set the x-auth-token in the header
    }

    res.json("Welcome " + foundedUser?.fname + " you are logged in.")

})

router.get("/signup", (req: Request, res: Response) => {

    res.send("welcome to Sign Up page")

})


router.post("/signup/submit", async (req: Request, res: Response, next: NextFunction) => {
    const { fname, lname, email, password } = _.pick(req.body, ["fname", "lname", "password", "email"]);

    //validate body using validate.js

    const validationOptions = {
        email: 'required|email',
        password: 'required',
        fname: 'required',
        lname: 'required'
    }
    const CustomErrorMessages = { email: "Please add valid email..." }
    let validation = new Validator({ fname, lname, email, password }, validationOptions, CustomErrorMessages)
    if (validation.fails()) {
        console.log("validation failed")
        throw new ValidationError(validation.errors)
    }

    interface PasswordComplexityErrors {
        [key: string]: Array<string>
    }



    //check password complexity
    const passwordComplexityValidation = checkPassComplexity(password);
    if (passwordComplexityValidation.error) {
        throw new PasswordComplexityError(passwordComplexityValidation)
    }


    const foundedUser = await User.findOne({ email });

    if (foundedUser) {
        throw new ValidationError({ "errors": ["Use already exist!!!"] })
    }

    // password hashed in userSchema with the mongoose pre hook 
    const newUser = User.build({ fname, lname, email, password })




    await newUser.save();

    // Generat token for the new user 
    const token = newUser?.generateToken(360000)

    // set the token in req.session {jwt: token}
    // set the token in the res.header { x-auth-token: token} 
    if (token) {
        req.session!.jwt = token      // set the token in the session-cookie header
        res.header("x_auth_token", token)    // set the x-auth-token in the header
    }
    // returned newUser not include password and 
    res.send(newUser.toObject())



})

router.post("/signout", (req: Request, res: Response) => {
    console.log('signout called');
    req.session = null;
    res.send("you have signed out.")
})

export default router;