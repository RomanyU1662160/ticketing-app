import request from 'supertest';
import server from '../../server';
import mongoose from 'mongoose';
import connectDb from '../../src/DB /connect';
import { signinMockUser, signupMockUser } from '../test-utils';

describe("currentUser- acceptace tests", () => {
    console.log("mongoose.connection.readyState", mongoose.connection.readyState)
    let mockUser = {
        fname: "John",
        lname: "Doe",
        email: "example@example.com",
        password: "Rafie208*"
    }
    beforeAll(async () => {
        await connectDb()
    })

    afterEach(async () => {
        server.close()
    })

    afterAll(async () => {
        await mongoose.connection.dropCollection('users')
        await mongoose.connection.close()
    })

    it("should return current user", async () => {
        const { signinResponse } = await signinMockUser(mockUser);
        const cookie = signinResponse.get('set-cookie');
        const currentUser = await request(server).get("/users/current-user").set('cookie', cookie).expect(200);
        expect(currentUser.body.currentUser).toHaveProperty('fname', mockUser.fname)
        expect(currentUser.body.currentUser).toEqual(expect.objectContaining({ id: expect.any(String), fname: mockUser.fname, lname: mockUser.lname, email: mockUser.email }))
    })

    it("should throw unauthorised 401 if user is not logged in", async () => {
        // authmiddleware will throw an error if session is not set in the request header

        const currentUser = await request(server).get('/users/current-user').expect(401)

        //check if the error message is exist as string in the response body
        expect(currentUser.body).toEqual(expect.objectContaining({ authError: expect.arrayContaining([expect.any(String)]) }))

        // check if the error message is correct
        expect(currentUser.body.authError).toEqual(expect.arrayContaining(["Session expired please login"]))

        //another type of check for the error message
        expect(currentUser.body).toEqual({
            "authError": [
                "Session expired please login"
            ]
        })

    })

})