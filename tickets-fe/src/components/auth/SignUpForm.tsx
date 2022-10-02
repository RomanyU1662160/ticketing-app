import { FormEvent, ReactElement, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// import UseFormSimple from '../../hooks/custom/useFormSimple';
import { useForm } from '../../hooks/custom/useForm';
import SimpleReactValidator from 'simple-react-validator';
import { useAuthContext } from '../../contexts/AuthContext';


const SignUpForm = (): ReactElement => {
    const simpleValidator = useRef(new SimpleReactValidator());

    const { formValues, handleChange, handleSubmit, errors } = useForm([], {})
    const { setIsLogged, setAuthError, isLogged } = useAuthContext();

    const handleSignup = async (e: FormEvent<HTMLFormElement>, url: string) => {
        try {
            await handleSubmit(e, url)

        } catch (error) {
            console.log(error)
            setIsLogged(false)
        }
    }

    const signUpUrl: string = `${process.env.REACT_APP_AUTH_URL}/signup/submit`;
    return (<>
        {!isLogged ? <div className="col-md-8 offset-md-2">
            <h3 className="text-center text-info"> Sign up  </h3>
            <Form onSubmit={(e): any => handleSignup(e, signUpUrl)}>
                <Form.Group className='m3' controlId='fname' >
                    <Form.Label>First Name: <span className="text-info"> {formValues.fname}</span> </Form.Label>
                    <Form.Control type='text' placeholder='First Name' name='fname' onChange={handleChange}
                        onBlur={() => simpleValidator.current.showMessageFor('fname')}
                    />
                    <span className="text-danger"> {simpleValidator.current.message('fname', formValues.fname, 'required')}</span>
                </Form.Group>
                <Form.Group className='mt-3' controlId='lname' >
                    <Form.Label>Last Name: <span className="text-info"> {formValues.lname}</span></Form.Label>
                    <Form.Control type='text' placeholder=' last name' name='lname' onChange={handleChange}
                        onBlur={() => simpleValidator.current.showMessageFor('lname')}
                    />
                    <span className="text-danger"> {simpleValidator.current.message('lname', formValues.lname, 'required')}</span>
                </Form.Group>
                <Form.Group className='mt-3' controlId='email' >
                    <Form.Label>Email: <span className="text-info"> {formValues.email}</span> </Form.Label>
                    <Form.Control type='email' placeholder='example@example.com' name='email' onChange={handleChange}
                        onBlur={() => simpleValidator.current.showMessageFor('email')}
                    />
                    <span className="text-danger"> {simpleValidator.current.message('email', formValues.email, 'required|email')} </span>
                </Form.Group>
                <Form.Group className='mt-3' controlId='password' >
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type='password' placeholder='password' name='password' onChange={handleChange}
                        onBlur={() => simpleValidator.current.showMessageFor('password')}
                    />
                    <span className="text-danger"> {simpleValidator.current.message('password', formValues.password, 'required|min:6')} </span>

                </Form.Group>


                {errors?.email ? <p className='text-danger'> {errors?.email}</p> : ""}
                {errors?.password ? <p className='text-danger'> {errors?.password}</p> : ""}
                {errors?.fname ? <p className='text-danger'> {errors?.fname}</p> : ""}
                {errors?.lname ? <p className='text-danger'> {errors?.lname}</p> : ""}


                <div className="d-grid gap-2 mt-3">
                    <Button type='submit' variant='info' className='float-right ' size='lg'  > Signup </Button> :
                </div>
            </Form>
        </div> : <p className='text-info'>  You are logged in  </p>}

    </>)

}

export default SignUpForm