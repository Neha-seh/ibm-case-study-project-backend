const Client = require('../models/client');

module.exports = {
    newClientObject,
    createClient,
    getClient,
    getAllClients,
    getNames
}

function newClientObject(req) {
    return {
        name: req.body.name,
        code_name: req.body.code_name,
        //industry: req.body.industry,
        contact_number: req.body.contact_number,
        contact_email: req.body.contact_email,
    }
}

async function createClient(req, res, next) {
    Client
        .create(newClientObject(req))
        .then(doc => {
            res.status(201).location(`/${doc._id}`).send();
        })
        .catch(next);
}

async function getClient(req, res, next) {
    Client
        .findOne({$or: [{_id: req.params._id}, {name: req.query.name}]})
        .exec()
        .then(doc => {
            if(doc) {
                res.status(200).send(doc);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(next);
}


async function getAllClients(req, res, next) {
    Client
        .find()
        .exec()
        .then(docs => {
            res.status(200).send(docs);
        })
        .catch(next);
}

async function getNames(req, res, next) {
    Client
        .find()
        .distinct('name')
        .exec()
        .then(names => {
            res.status(200).send(names);
        })
        .catch(next);
}
