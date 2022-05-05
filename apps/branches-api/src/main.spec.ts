import * as express from "express";
import * as branches from "./routes/branches";
import * as request from "supertest";

let app = express();

app.use(`/`, branches.router);

describe('GET branches', function() {
    it('responds with list of branches', function(done) {
        request(app)
        .get('/')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
});