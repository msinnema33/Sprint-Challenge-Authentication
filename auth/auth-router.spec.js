const request = require("supertest");
const server = require("../api/server.js");
const test = "newValue2"
describe("auth router", function() {
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