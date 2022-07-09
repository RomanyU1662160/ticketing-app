import { NextFunction, Request, Response } from "express";

import User, { IUser } from "../../models/User";

import express from 'express';

import Validator, { ValidationErrors } from 'validatorjs';
import { ValidationError } from "../../services/ErrorHandling.service";
import checkPassComplexity from "../../helpers/passwordComplexity";
import _ from "lodash";
import { Password } from "../../services/PassowrdHashing.service";
import validateLogin from "../../validations/loginValidator";
import auth from "../../../middleware/currentUser";

const router = express.Router();


router.get("/login", auth, (req: Request, res: Response) => {
    try {
        res.send("welcome to login page.")

    } catch (error: any) {
        console.log('error.message !!!:::>>>', error.message)
        res.send(error.message)
    }

})



router.post("/login/submit", async (req: Request, res: Response, next: NextFunction) => {
    try {
        // 1- vlaidate email and password is in the body 
        const validation = validateLogin(req.body)
        if (validation.fails()) {
            return res.status(500).send(validation.errors)
        }

        const { email, password } = req.body;
        // 2- check if user with this email is exist

        const foundedUser = await User.findOne({ email });
        if (!foundedUser) res.status(404).send(`User with email ${email} is not found  `)

        // 3- check if password is matched with foundedUser
        const matched = await Password.compare(foundedUser?.password!, password);
        if (!matched) res.status(500).send("password is not match with our data.")

        // 4- generate token if user is founded (payload inlcude foundeduser)

        const token = foundedUser?.generateToken(360000)

        // 5- set the token in req.session {jwt: token}
        // set the token in the res.header { x-auth-token: token} 
        if (token) {
            req.session!.jwt = token      // set the token in the session-cookie header
            res.header("x_auth_token", token)    // set the x-auth-token in the header
        }

        res.send("Welcome " + foundedUser?.fname + " you are logged in.")
    } catch (error: any) {
        console.log('error.message :::>>>', error.message)
    }
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
        console.log("email:::>>>>", email)
        const CutomErrorMessages = { email: "Please add valid email..." }
        let validation = new Validator({ fname, lname, email, password }, validationOptions, CutomErrorMessages)
        if (validation.fails()) {
    console.log("validaition fialed")  
     throw  new ValidationError(validation.errors)

        }
        const foundedUser = await User.findOne({ email });

        if (foundedUser) {
            return res.status(400).send("User already exist!!!")
        }

        // password hashed in userSchema with the mongoose pre hook 
        const newUser = User.build({ fname, lname, email, password })

        //check password complexity
        const passwordComplexityValidation = checkPassComplexity(password);
        if (passwordComplexityValidation.error) {
            return res.status(400).send(passwordComplexityValidation.error)
        }


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
    console.log('signout called ');
    req.session = null;
    res.send("you have signed out.")
})

export default router;