import { ReactElement } from 'react';
import { Form, Button } from 'react-bootstrap';




const LoginForm = (): ReactElement => {
    return (<> <h3 className="text-info text-center">  Login </h3>
        <Form>
            <Form.Group className='m3'>
                <Form.Label> Email</Form.Label>
                <Form.Control type='email' placeholder='exmple@example.com' />
            </Form.Group>
            <Form.Group className='mt-3' controlId='password' >
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder='password' />
            </Form.Group>
            <div className="d-grid gap-2 mt-3">
                <Button variant='info' className='float-right' size='lg' > Login </Button>
            </div>
        </Form>
    </>)

}

export default LoginForm