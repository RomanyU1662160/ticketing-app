import { Validator } from "react";


const SignUpFormValudation = (values: any) => {
    const rules = {
        email: 'required|email',
        password: 'required',
        confirmPassword: 'required|same:password',
        firstName: 'required',
        lastName: 'required',
    }


}
export default SignUpFormValudation;