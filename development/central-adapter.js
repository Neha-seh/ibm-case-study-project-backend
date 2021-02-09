const
    User = require('./models/user'),
    Client = require('./models/client'),
    CaseStudy = require('./models/case-study'),
    UserAdapter = require('./sub_adapters/adapter-user'),
    ClientAdapter = require('./sub_adapters/adapter-client'),
    CaseStudyAdapter = require('./sub_adapters/adapter-case-study'),
    pdf = require("html-pdf"),
    pdfTemplate = require("./documents/case-study-pdf");

module.exports = {
    UserAdapter,
    ClientAdapter,
    CaseStudyAdapter,
    modifyRequestForDrafts,
    modifyRequestForPublished,
    getUserCaseStudies,
    getPDF,
    createPDF
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

async function createCaseStudy(req, res, next) {
    const caseStudyDoc = await CaseStudy.create(CaseStudyAdapter.newCaseStudyObject(req)).catch(next);
    res.status(201).location(`/${caseStudyDoc._id}`).send();
    await User.findOneAndUpdate({username: req.body.username}, {
        $push: {case_studies: caseStudyDoc._id}
    }).exec().catch(next);
}

async function modifyRequestForDrafts(req, res, next) {
    req.body.status = 'Draft';
    next();
}

async function modifyRequestForPublished(req, res, next) {
    req.body.status = 'Published';
    next();
}

async function getUserCaseStudies(req, res) {
    CaseStudy
        //.find({status: req.query.status, employee_id: req.query.username})
        .find({status: req.body.status, employee_id: req.body.params.username})
        .select('project_name client_name')
        .exec()
        .then(docs => {
            /*if(docs.length > 0) {
                res.status(200).send(docs)
            } else {
                res.sendStatus(404)
            }*/
            res.send(docs);
        })
    //.catch(next);
}

async function getPDF(req, res) {
    res.sendFile(`${__dirname}/CaseStudy.pdf`);
}

async function createPDF(req, res) {
    pdf
        .create(pdfTemplate(req.body),{})
        .toFile("CaseStudy.pdf",(err)=> {
            if(err){
                res.send(Promise.reject());
            } else {
                res.send(Promise.resolve());
            }
        });

}
