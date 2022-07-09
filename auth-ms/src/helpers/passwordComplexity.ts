import { ValidationResult } from "joi";
import passwordComplexity, { ComplexityOptions } from "joi-password-complexity";


const options: ComplexityOptions = {
    min: 4,
    max: 50,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1
}

const checkPassComplexity = (pass: string): ValidationResult => {
    const result = passwordComplexity(options, "Password").validate(pass);
    return result

}

export default checkPassComplexity;