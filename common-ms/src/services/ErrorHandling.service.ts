import { Errors, ValidationErrors, Validator } from "validatorjs"
import Joi, { ValidationResult } from 'joi';

/**
 * Error handling Abstract class extends Error and has abstract proprties seralizeErrors and statuCode
 * abstract means : 
  * - proprety must exist in child class.
  * - proprety must have its implementation in the child class, because abstract methods never talk about implementation
*/



export abstract class ErrorHandlingService extends Error {

    abstract statusCode: number;
    abstract seralizeErrors(): ValidationErrors | Validator.Errors;

    constructor(public errors?: ValidationErrors | Validator.Errors | Joi.ValidationResult) {
        super()
        // because we are extending a built in class 'Error'
        Object.setPrototypeOf(this, ValidationError.prototype)
    }
}

export class ValidationError extends ErrorHandlingService {
    public statusCode: number = 400
    constructor(public errors: ValidationErrors | Validator.Errors) {
        super(errors)
        Object.setPrototypeOf(this, ValidationError.prototype)
    }
    seralizeErrors = () => {
        return this.errors
    }
}

export class PasswordComplexityError extends ErrorHandlingService {
    public statusCode: number = 400

    constructor(public errors: Joi.ValidationResult) {
        super(errors)
    }
    seralizeErrors = () => {
        const seralizedErors = this.errors.error?.details.reduce((acc: any, curr: any) => {
            return { ...acc, password: curr.message }
        }, 0)

        return ({ errors: seralizedErors })
    }

}

export class DbConnectionError extends ErrorHandlingService {
    public statusCode = 500
    constructor(public message: string) {
        super()
        Object.setPrototypeOf(this, DbConnectionError.prototype)
    }
    seralizeErrors = () => {
        let errors = { database: [this.message] }
        return errors
    }
}

export class AuthenticationError extends ErrorHandlingService {
    public statusCode = 401
    constructor(public message: string) {
        super()
        Object.setPrototypeOf(this, AuthenticationError.prototype)
    }

    seralizeErrors = () => {
        let errors = { authError: [this.message] }
        return errors
    }

}

export class MissingEnvVariableError extends ErrorHandlingService {
    public statusCode: number = 505;
    public errors: any;
    constructor(public message: string) {

        super()
        Object.setPrototypeOf(this, MissingEnvVariableError.prototype)
    }

    seralizeErrors = () => {
        this.errors = { ENVERR: [this.message] }
        return this.errors
    }

}



/* note:
* can use interface instead of abstract class
*/
// interface IError extends Error {
//     statusCode: number
//     eralizeErrors(): ValidationErrors | Validator.Errors;
// }