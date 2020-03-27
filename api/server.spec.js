const request = require('supertest');

const server = require('./server.js');

describe("server.js", function() {
    describe("GET /", function() {
      it("should return 200 OK", function(){
          return request(server)
            .get('/')
            .expect(200);
      });
      it("should return JSON", function() {
          return request(server).get('/')
          .then(res => {
              expect(res.type).toMatch(/json/i);
          });
      });
      it('should respond with { api: "api is up and running!" }', function() {
          return request(server)
          .get('/')
          .then(res => {
              expect(res.body.api).toBe("api is up and running!");
          });
      });
    });
  });