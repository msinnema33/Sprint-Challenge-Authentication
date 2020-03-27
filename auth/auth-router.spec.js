const request = require("supertest");
const server = require("../api/server.js");
const test = "newValue5"
describe("auth router register", function() {
  it("should run the tests", function() {
    expect(true).toBe(true);
  });
  describe("POST /api/auth/register", () => {
    it("should return 201 created", async () => {
      const res = await request(server)
        .post("/api/auth/register")
        .send({
          username: test,
          password: test
        });
      expect(res.status).toBe(201);
    });
    it("should not register a user without a unique username", async () =>{
      const res = await request(server)
      .post("/api/auth/register")
      .send({
        username: "test",
        password:"err"
       });
      expect(res.status).toBe(500) 
    });
})
});

describe("auth router login", function() {
  it("should run the tests", function() {
    expect(true).toBe(true);
  });
  describe("POST /api/auth/login", () => {
    it("should return 200 logged in", async () => {
      const res = await request(server)
        .post("/api/auth/login")
        .send({ username: "test4", password: "test4" });
      expect(res.status).toBe(200);
    });
    it('should not log in a user with an incorrect password', async() =>{
      const res = await request(server)
      .post("/api/auth/login")
      .send({ username: test, password: "incorrect" });
    expect(res.status).toBe(401);
    })
  });
});