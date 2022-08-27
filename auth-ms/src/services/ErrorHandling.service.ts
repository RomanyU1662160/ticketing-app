import { Errors, ValidationErrors, Validator } from "validatorjs"

/**
 * Error handling Abstract class extends Error and has abstract proprties seralizeErrors and statuCode
 * abstract means : 
  * - proprety must exist in child class.
  * - proprety must have its implementation in the child class, because abstract methods never talk about implementation
*/



export abstract class ErrorHandling extends Error {

    abstract statusCode: number;
    abstract seralizeErrors(): ValidationErrors | Validator.Errors;

    constructor(public errors?: ValidationErrors | Validator.Errors) {
        super()
        // because we are extending a built in class 'Error'
        Object.setPrototypeOf(this, ValidationError.prototype)
    }
}

export class ValidationError extends ErrorHandling {
    public statusCode: number = 400
    constructor(public errors: ValidationErrors | Validator.Errors) {
        super(errors)
        Object.setPrototypeOf(this, ValidationError.prototype)
    }
    seralizeErrors = () => {
        return this.errors
    }
}

export class DbConnectionError extends ErrorHandling {
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

export class AuthenticationError extends ErrorHandling {
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

export class MissingEnvVariableError extends ErrorHandling {
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