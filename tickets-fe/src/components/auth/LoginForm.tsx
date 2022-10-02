import { FormEvent, ReactElement, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useForm } from '../../hooks/custom/useForm';
import { useNavigate } from 'react-router-dom';

import SimpleReactValidator from 'simple-react-validator';
import { useAuthContext } from '../../contexts/AuthContext';


const LoginForm = (): ReactElement => {
    const { formValues, handleChange, handleSubmit, errors } = useForm([], {})
    const { setIsLogged, isLogged, setAuthError } = useAuthContext();
    const signInURL = `${process.env.REACT_APP_AUTH_URL}/login/submit`;
    const navigate = useNavigate();

    const simpleValidator = useRef(new SimpleReactValidator());

    const handleLogin = async (e: FormEvent<HTMLFormElement>, url: string) => {
        const res = await handleSubmit(e, url)
        console.log('res.status ::::>>>', res?.status)
        console.log('res.ok ::::>>>', res?.ok)
        if (res?.ok) {
            setIsLogged(true)
            setAuthError(undefined)
            navigate('/')
        }
    }

    return (<>
        {!isLogged ? <div className="col-md-8 offset-md-2">
            <h3 className="text-info text-center">  Login </h3>
            <Form onSubmit={(e) => handleLogin(e, signInURL)}>
                <Form.Group className='m3' >
                    <Form.Label> Email</Form.Label>
                    <Form.Control type='email' name="email" placeholder='exmple@example.com' onChange={handleChange} onBlur={() => simpleValidator.current.showMessageFor('email')} />
                    <span className="text-danger"> {simpleValidator.current.message('email', formValues.email, 'required|email')} </span>
                </Form.Group>
                <Form.Group className='mt-3' controlId='password' >
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' name="password" placeholder='password' onChange={handleChange} onBlur={() => simpleValidator.current.showMessageFor('password')} />
                    <span className="text-danger"> {simpleValidator.current.message('password', formValues.password, 'required')} </span>
                </Form.Group>

                {errors?.email ? <p className='text-danger'> {errors?.email}</p> : ""}
                {errors?.password ? <p className='text-danger'> {errors?.password}</p> : ""}

                <div className="d-flex align-content-center justify-content-md-end flex-row gap-2 mt-3">
                    <Button type='submit' variant='info' className='btn btn-lg mr-auto' size='lg' > Login </Button>
                </div>
            </Form>
        </div> :
            <div> You already logged in </div>}
    </>)

}

export default LoginForm