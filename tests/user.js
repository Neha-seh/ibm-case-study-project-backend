const
    app = require('../src/app'),
    request = require('supertest'),
    assert = require('assert');

const mocks = [
    {employee_id: "0", name: "Agile Team 6", password: "bob", email: "team@gmail.com"},
    {employee_id: "1", name: "ibm", password: "ibm", email: "ibm@ibm.com"}
];

/*
 * Don't really need to test,
 */
describe('Test Create Users', function () {
    mocks.forEach(function (mock) {
        it(`Create and insert ${mock.name} into the database`, function (done) {
            request(app)
                .post('/register')
                .send(mocks)
                .set('Accept', 'application/json')
                .expect(201);
            done();
        });
    });
});

describe('Test user authentication', function () {
    it('#authenticateUser() as ibm user', function (done) {
        request(app)
            .post('/login')
            .send({
                username: 'ibm',
                password: 'ibm'
            })
            .set('Accept', 'application/json')
            .expect(201)
        done();
    });
});