let expect = require('chai').expect;
let request = require('request');

describe('Status', function() {
    describe ('Landing page', function() {
        it('status', function(done) {
            request('http://localhost:3000/', function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
    });
});

describe('Status', function() {
    describe ('Create Stock Page ', function() {
        it('status', function(done) {
            request('http://localhost:3001/inventory/add', function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
    });
});