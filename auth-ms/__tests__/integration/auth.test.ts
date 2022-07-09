// https://dev.to/remrkabledev/testing-with-mongodb-memory-server-4ja2
// https://dev.to/paulasantamaria/testing-node-js-mongoose-with-an-in-memory-database-32np

import request from 'supertest';
import server from '../../server';
import { setTestEnv, restoreEnv } from '../test-utils';
import mongoose from 'mongoose';

let mockUser = {
  fname: "John",
  lname: "Doe",
  email: "example@example.com",
  password: "Rafie208*"
}

describe('AuthMs', () => {
  beforeAll(() => {
    setTestEnv()
  })

  afterEach(async () => {
    server.close()
  })

  afterAll(async () => {
    // restoreEnv()
    await mongoose.connection.dropCollection('users')
    mongoose.connection.close()
  })

  describe("sign up endpoint", () => {
    it("should be able to signup", async () => {
      const resp = await request(server).post("/signup/submit").send(mockUser).expect(200);
      expect(resp.body).toHaveProperty('fname', mockUser.fname)
      expect(resp.body).toEqual(expect.objectContaining({ ...mockUser, password: expect.any(String) }))
    })


    it("Should set the token in the session-cookie header", async () => {
      mockUser = { ...mockUser, email: "example2@example.com" }
      console.log("mockUser::>>>", mockUser)
      const resp = await request(server).post("/signup/submit").send(mockUser).expect(200);
      console.log("res. error::>>>", resp.error)
      expect(resp.headers).toHaveProperty('set-cookie')
    }
    )
    it("should return 400 if user is already exist", async () => {
      await request(server).post("/signup/submit").send(mockUser);
      await request(server).post("/signup/submit").send(mockUser).expect(400);
    })

    it("should through an error if body validation failed ", async () => {
      mockUser = { ...mockUser, email: "notValidEmail" }
      const res = await request(server).post("/signup/submit").send(mockUser).expect(505);
      const expectedError = { errors: { email: ['Please add valid email...'] } }
      expect(res.body).toEqual(expect.objectContaining(expectedError))
    })

  })
})