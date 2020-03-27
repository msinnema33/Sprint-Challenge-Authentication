const request = require("supertest");
const server = require("../api/server.js");

const db = require("../database/dbConfig");

describe('jokes router', function() {
    it('should return an array of jokes', function() {
        return request(server)
        .get('https://icanhazdadjoke.com/search')
        .then(res => {
            expect(Array.isArray(res.body)).toBe(true);
        })
    })
    it('should return status 200', function() {
        return request(server)
            .get('https://icanhazdadjoke.com/search')
            .then(res => {
                expect(res.status).toBe(200);
            })
    })
})