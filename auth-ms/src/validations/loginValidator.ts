
import { Request } from 'express';
import Validator from 'validatorjs';

const validateLogin = (req: Request) => {

    const rules = { email: 'required|email', password: 'required' }
    const validation = new Validator(req, rules)
    return validation
}

export default validateLogin

