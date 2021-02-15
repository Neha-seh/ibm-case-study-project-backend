/*
 * Unused for now,
 */

const
    User = require('../models/user'),
    Client = require('../models/client'),
    CaseStudy = require('../models/case-study');

module.exports = {

}

/*
async function processClient(req, res, next) {
    if(req.body.client_name) {
        const clientObject = ClientAdapter.newClientObject(req);
        Promise
            .resolve()
            .then(() => Client.findOne(clientObject))
            .then(doc => {
                if(doc) {
                    return doc;
                } else {
                    return Client.create(clientObject);
                }
            })
            .then(doc => {
                req.body.client_id = doc.get('_id');
                next();
            })
            .catch(next);
    }
}
*/

/*
async function createCaseStudy(req, res, next) {
    const caseStudyDoc = await CaseStudy.create(CaseStudyAdapter.newCaseStudyObject(req)).catch(next);
    res.status(201).location(`/${caseStudyDoc._id}`).send();
    await User.findOneAndUpdate({username: req.body.username}, {
        $push: {case_studies: caseStudyDoc._id}
    }).exec().catch(next);
}
*/
