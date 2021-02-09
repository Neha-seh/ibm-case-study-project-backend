const
    app = require('../src/app'),
    request = require('supertest'),
    assert = require('assert'),
    Client = require('../src/models/client');

/*describe('Test Create Case Studies', function () {
    const mocks = [];

    before('Generate mocks', async function (done) {
        const sparkClient = await Client.findOne({client_name: 'Spark'}).exec().catch(done);
        const sparkCaseStudyObject = {
            name: 'Spark Project',
            project_industry: 'Telecommunications',
            project_city: 'Wellington',
            project_country: 'New Zealand',
            project_start_date: '2021-02-20',
            client: sparkClient.get('_id')
        }
        mocks.push(sparkCaseStudyObject);
        done();
    });


});*/

describe('Create case studies for an existing client', function () {
    let mock;

    before('Insert an initial client and generate a case study post request mock', async function () {
        const vodafoneClientObject = {client_name: "Vodafone", client_contact_number: "135", client_contact_email: "vodafone@vodafone.com"};
        const vodafoneClient = await Client.create(vodafoneClientObject).catch()
        mock = {
            name: 'Vodafone Project',
            project_industry: 'Telecommunications',
            project_city: 'Wellington',
            project_country: 'New Zealand',
            project_start_date: '2021-02-20',
            client: {_id: vodafoneClient._id}
        }
    });

    it(`Create and insert vodafone case study into the database`, function (done) {
        request(app)
            .post('/create')
            .send(mock)
            .set('Accept', 'application/json')
            .expect(201)
            .then(res => {
                //assert.strictEqual(res.location, `${}`);
                done();
            })
            .catch(done);
    });
});

describe('Search for case studies and filter by industry', function() {
    it('Filter by industry', function(done) {
        request(app)
            .get('/search')
            .query({industry: 'Telecommunications'})
            .set('Accept', 'application/json')
            .expect(200)
            .then(res => {
                assert.strictEqual(res.body[0].name, 'Vodafone Project');
                done();
            })
            .catch(done);

    });
});
