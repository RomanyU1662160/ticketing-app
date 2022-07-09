// https://dev.to/remrkabledev/testing-with-mongodb-memory-server-4ja2
// https://dev.to/paulasantamaria/testing-node-js-mongoose-with-an-in-memory-database-32np

import request from 'supertest';
import server from '../../server';
import { setTestEnv, restoreEnv } from '../test-utils';
import mongoose from 'mongoose';

import { Password } from '../../src/services/PassowrdHashing.service';



describe('AuthMs', () => {
  beforeAll(() => {
    setTestEnv()
    console.log(" DB_USE_LOCAL_MONGO", process.env.DB_USE_LOCAL_MONGO)
    
  })

  afterEach(async () => {

    server.close()
  await mongoose.connection.dropCollection('users')
  })


  afterAll(() => {
   // restoreEnv()
    mongoose.connection.close()
  })
  describe("sign up endpoint", () => {
    it("should be able to signup", async () => {
      const payload = {
        fname: "John",
        lname: "Doe",
        email: "examle@example.com",
        password: "Rafie208*",
      }
      const resp = await request(server).post("/signup/submit").send(payload).expect(200);
      payload.password =  await Password.hash(payload.password)
      expect(resp.body).toHaveProperty('fname', payload.fname)
      expect(resp.body).toMatchObject(payload)
    })
  })
})