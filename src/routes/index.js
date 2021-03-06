const
    router = require('express').Router(),
    CaseStudy = require('../models/case-study'),
    pdf = require("html-pdf"),
    pdfTemplate = require("../documents/case-study-pdf");

router.post('/view-by-id1',getCaseStudy);
router.post('/searchtags', getManyCaseStudies);
router.post('/create', createCaseStudy);
router.post('/update',updateCaseStudy);
router.get('/view-all', getAllCaseStudies);
router.post('/view-your-cs-draft', [modifyRequestForDrafts, getUserCaseStudies]);
router.post('/view-your-cs-published', [modifyRequestForPublished, getUserCaseStudies]);
router.get('/fetch-pdf', getPDF);
router.post('/create-pdf', createPDF);

module.exports = router;

function newCaseStudyObject(req) {
    return {
        project_name: req.body.project_name,
        project_industry: req.body.project_industry,
        project_start_date: req.body.project_start_date,
        project_end_date: req.body.project_end_date,
        city: req.body.city,
        country: req.body.country,
        problem_space: req.body.problem_space,
        idea: req.body.idea,
        approach: req.body.approach,
        impact: req.body.impact,
        tags: req.body.tags,
        status: req.body.status,
        employee_id: req.body.username,
        client_name: req.body.client_name,
        client_code_name: req.body.client_code_name,
        client_address: req.body.client_address,
        client_phone: req.body.client_phone,
        client_email: req.body.client_email,
    };
}

/* Request Handlers */

async function getCaseStudy(req, res) {
    CaseStudy
        .find({_id: req.body.params._id})
        .exec()
        .then(doc => {
            res.send(doc);
        })
}

async function getManyCaseStudies(req, res) {
    const search = `${req.body.project_industry} ${req.body.client_name} ${req.body['tag_data']}`
    CaseStudy
        .find({$text: {$search: search}})
        .exec()
        .then(docs => {
            res.send(docs);
        })
}

async function getAllCaseStudies(req, res) {
    CaseStudy
        .find({status: 'Published'})
        .select('project_name client_name')
        .exec()
        .then(docs => {
            res.send(docs);
        })
}

async function createCaseStudy(req, res) {
    CaseStudy
        .create(newCaseStudyObject(req))
        .then(doc => {
            res.status(201).location(`/${doc._id}`).send();
        })
        .catch(err => {res.send('Failed to create case study')});
}

async function updateCaseStudy(req, res) {
    CaseStudy
        .updateOne({_id: req.body._id}, newCaseStudyObject(req))
        .exec()
        .then(() => {
            res.sendStatus(201);
        })
        .catch(err => {res.send('Failed to Update case study')});
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
        .find({status: req.body.status, employee_id: req.body.params.username})
        .select('project_name client_name')
        .exec()
        .then(docs => {
            res.send(docs);
        })
}

async function getPDF(req, res) {
    res.sendFile(`${__dirname}/CaseStudy.pdf`);
}

async function createPDF(req, res) {
    pdf
        .create(pdfTemplate(req.body),{})
        .toFile("routes/CaseStudy.pdf",(err)=> {
            if(err){
                res.send(Promise.reject());
            } else {
                res.send(Promise.resolve());
            }
        });
}
