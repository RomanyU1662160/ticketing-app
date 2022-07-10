import mockedEnv, { RestoreFn } from 'mocked-env';
import { User } from './interfaces/User';
import request from 'supertest';
import server from '../server';
import { cookie } from 'express-validator';


let restore: RestoreFn

// No need to use the mockedEnv.mock() method,used .env-test.ts instead

export const setTestEnv = () => {
    restore = mockedEnv({
        DB_USE_LOCAL_MONGO: 'true',
        PORT: '5002'
    })
}

export const restoreEnv = () => {
    restore();
}



export const signupMockUser = async (user: User) => {
    return await request(server).post("/signup/submit").send(user)

}

export const signinMockUser = async (user: User) => {
    const signupResponse = await request(server).post("/signup/submit").send(user);
    const signinResponse = await request(server).post("/login/submit").send({ email: user.email, password: user.password });
    console.log("signinResponse.body :::>>>", signinResponse.body);
    console.log("signinResponse.error :::>>>", signinResponse.error);
    console.log("signinResponse.statusCode :::>>>", signinResponse.statusCode);
    return { signinResponse, signupResponse };
}
