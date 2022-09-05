import { ReactElement } from 'react';
import { Form, Button } from 'react-bootstrap';




const LoginForm = (): ReactElement => {
    return (<>
        <div className="col-md-8 offset-md-2">
            <h3 className="text-info text-center">  Login </h3>
            <Form>
                <Form.Group className='m3'>
                    <Form.Label> Email</Form.Label>
                    <Form.Control type='email' placeholder='exmple@example.com' />
                </Form.Group>
                <Form.Group className='mt-3' controlId='password' >
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='password' />
                </Form.Group>
                <div className="d-flex align-content-center justify-content-md-end flex-row gap-2 mt-3">
                    <Button variant='info' className='btn btn-lg mr-auto' size='lg' > Login </Button>
                </div>
            </Form>
        </div>
    </>)

}

export default LoginForm