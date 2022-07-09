import { ValidationErrors, Validator } from "validatorjs"
import { ErrorHandling } from "./ErrorHandling.service"



export class ValidationError extends ErrorHandling {
    public statusCode: number = 505
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