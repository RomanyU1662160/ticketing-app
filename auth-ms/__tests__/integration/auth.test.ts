// https://dev.to/remrkabledev/testing-with-mongodb-memory-server-4ja2
// https://dev.to/paulasantamaria/testing-node-js-mongoose-with-an-in-memory-database-32np

import request from 'supertest';
import server from '../../server';
import { setTestEnv, restoreEnv } from '../test-utils';
import mongoose from 'mongoose';
import connectDb from '../../DB /connect';
import { signupMockUser } from '../test-utils';

let mockUser = {
  fname: "John",
  lname: "Doe",
  email: "example@example.com",
  password: "Rafie208*"
}

describe('Auth', () => {

  beforeAll(async () => {
    await connectDb()
  })

  afterEach(async () => {
    server.close()
  })

  afterAll(async () => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
  })




  describe('sign up- acceptance tests', () => {



    describe("sign up endpoint", () => {
      it("should be able to signup", async () => {
        const resp = await request(server).post("/signup/submit").send(mockUser).expect(200);
        expect(resp.body).toHaveProperty('fname', mockUser.fname)
        expect(resp.body).toEqual(expect.objectContaining({ ...mockUser, password: expect.any(String) }))
      })


      it("Should set the token in the session-cookie header", async () => {
        const payload = { ...mockUser, email: "example2@example.com" }
        const resp = await request(server).post("/signup/submit").send(payload).expect(200);
        expect(resp.headers).toHaveProperty('set-cookie')
        expect(resp.get('set-cookie')).toBeDefined()
      }
      )
      it("should return 400 if user is already exist", async () => {
        await request(server).post("/signup/submit").send(mockUser);
        await request(server).post("/signup/submit").send(mockUser).expect(400);
      })

      it("should through an error if body validation failed ", async () => {
        const payload = { ...mockUser, email: "notValidEmail" }
        const res = await request(server).post("/signup/submit").send(payload).expect(505);
        const expectedError = { errors: { email: ['Please add valid email...'] } }
        expect(res.body).toEqual(expect.objectContaining(expectedError))
      })

      it("should through an error if password is not complex enough", async () => {
        const payload = { ...mockUser, email: "example3@example.com", password: "123" }
        const res = await request(server).post("/signup/submit").send(payload);
      })

      it("should throw an error if email/password is not in the body", () => {
        const res = request(server).post("/signup/submit").send({}).expect(505);
      })

    })
  })

  describe('sign in- acceptance tests', () => {

    it("should be able to signin", async () => {
      const res = await request(server).post("/login/submit").send({ email: mockUser.email, password: mockUser.password }).expect(200);
    })

    it("should set the token in the session-cookie header if login succeed", async () => {
      const res = await request(server).post("/login/submit").send({ email: mockUser.email, password: mockUser.password }).expect(200);
      expect(res.headers).toHaveProperty('set-cookie')
      expect(res.get('set-cookie')).toBeDefined()

    })

    it("should throw an error if email/password is not in the body", async () => {
      await request(server).post("/login/submit").send({}).expect(500)
    })

    it("should throw 404 if email is not correct", async () => {
      await request(server).post("/login/submit").send({ email: "notExist@example.com", password: "123" }).expect(404)
    })

    it("should throw 404 if password is not correct", async () => {
      await request(server).post("/login/submit").send({ email: mockUser.email, password: "123" }).expect(500)
    })
  })
  describe('logout- acceptance tests', () => {
    it("should be able to logout", async () => {
      const res = await request(server).post("/signout").expect(200);
      // logout set expiry cokkie to the past 
      expect(res.headers).toHaveProperty('set-cookie')
      expect(res.get('set-cookie')[0]).toMatch("session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly")
    }
    )
  })
})
