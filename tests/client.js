const
    app = require('../src/app'),
    request = require('supertest'),
    assert = require('assert');

const mockClientObjects = [
    {client_name: "IBM", client_contact_number: "123", client_contact_email: "ibm@whatever.com"},
    {client_name: "Google", client_contact_number: "456", client_contact_email: "google@gmail.com"},
    {client_name: "Spark", client_contact_number: "789", client_contact_email: "telecom@spark.com"},
    {client_name: "Kiwibank", client_contact_number: "987", client_contact_email: "kiwibank@outlook.com"},
    {client_name: "Vish", client_code_name: "V", client_contact_number: "654", client_contact_email: "ibm@gmail.com"}
];

describe('Create Clients', function () {
    mockClientObjects.forEach(function (clientObject) {
        it(`Create and insert ${clientObject.client_name} into the database`, function (done) {
            request(app)
                .post('/client/create')
                .send(clientObject)
                .set('Accept', 'application/json')
                .expect(201)
                .then(res => {
                    done()
                })
                .catch(done);
        });
    });
});

describe('Get Clients by name', function () {
    mockClientObjects.forEach(function (clientObject) {
        it(`Find and retrieve ${clientObject.client_name} by name`, function (done) {
            request(app)
                .get('/client/search')
                .query({name: clientObject.client_name})
                .set('Accept', 'application/json')
                .expect(200)
                .then(res => {
                    assert.strictEqual(res.body.name, clientObject.client_name);
                    /*assert.strictEqual(res.body.name, clientObject.client_name);
                    assert.strictEqual(res.body.code_name, clientObject.client_code_name);
                    assert.strictEqual(res.body.industry, clientObject.client_industry);
                    assert.strictEqual(res.body.contact_number, clientObject.client_contact_number);
                    assert.strictEqual(res.body.contact_email, clientObject.client_contact_email);*/
                    done()
                })
                .catch(reason => done(reason));
        });
    });
});