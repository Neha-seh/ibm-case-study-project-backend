const
    CaseStudy = require('../models/case-study'),
    pdf = require("html-pdf"),
    pdfTemplate = require("../documents/case-study-pdf");

module.exports = {
    newCaseStudyObject,
    getCaseStudy,
    getManyCaseStudies,
    getAllCaseStudies,
    getIndustries,
    createCaseStudy,
    updateCaseStudy,
    modifyRequestForDrafts,
    modifyRequestForPublished,
    getUserCaseStudies,
    getPDF,
    createPDF
}

function newCaseStudyObject(req) {
    return {
        //owner {type: String, required: true},
        project_name: req.body.project_name,
        project_industry: req.body.project_industry,
        project_start_date: req.body.project_start_date,
        project_end_date: req.body.project_end_date,
        //project_city: {type: String},
        //project_country: {type: String},
        problem_space: req.body.problem_space,
        idea: req.body.idea,
        approach: req.body.approach,
        impact: req.body.impact,
        status: req.body.status,
        tags: req.body.tags,
        //client: {type: mongoose.Schema.Types.ObjectID, ref: 'Client'}

        employee_id: req.body.username,
        city: req.body.city,
        country: req.body.country,
        client_name: req.body.client_name,
        client_code_name: req.body.client_code_name,
        client_phone: req.body.client_phone,
        client_email: req.body.client_email,
    };
}

async function getCaseStudy(req, res) {
    CaseStudy
        //.findOne({$or: [{_id: req.params._id}, {project_name: req.query.project_name}]})
        .find({_id: req.body.params._id})
        .exec()
        .then(doc => {
            /*if (doc) {
                res.status(200).send(doc);
            } else {
                res.sendStatus(404);
            }*/
            res.send(doc);
        })
        //.catch(next);
}

async function getManyCaseStudies(req, res, next) {
    //const search = `${req.body.project_industry} ${req.body.client_name} ${req.body['tag_data']}`
    CaseStudy
        .find({$text: {$search: `${req.query['q']} ${req.query['industry']} ${req.query['company']}`}})
        //.find({$text: {$search: search}})
        .exec()
        .then(docs => {
            res.status(200).send(docs);
        })
        .catch(next);
}

async function getAllCaseStudies(req, res) {
    CaseStudy
        .find({status: 'Published'})
        .select('project_name client_name')
        .exec()
        .then(docs => {
            res.status(200).send(docs);
        })
        //.catch(next);
}

async function createCaseStudy(req, res) {
    CaseStudy
        .create(newCaseStudyObject(req))
        .then(doc => {
            res.status(201).location(`/${doc._id}`).send();
        })
        //.catch(next);
        .catch(err => {res.send('Failed to create case study')});
}

async function updateCaseStudy(req, res) {
    CaseStudy
        .updateOne({_id: req.body._id}, newCaseStudyObject(req))
        .exec()
        .then(() => {
            res.sendStatus(201);
        })
        //.catch(next);
        .catch(err => {res.send('Failed to Update case study')});
}

async function getIndustries(req, res, next) {
    CaseStudy
        .find()
        .distinct('project_industry')
        .exec()
        .then(industries => {
            res.status(200).send(industries);
        })
        .catch(next);
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
            res.status(200).send(docs)
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
