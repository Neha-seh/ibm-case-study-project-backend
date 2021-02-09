const
    User = require('../models/user');

module.exports = {
    newUserObject,
    createUser,
    authenticateUser,
    //getUserCaseStudies
}

/*
 * TODO:
 *  A lot,
 *  For authenticateUser:
 *      Need proper authentication header,
 *      Need to implement token authentication,
 */

function newUserObject(req) {
    return {
        employee_id: req.body.employee_id,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    }
}

async function createUser(req, res, next) {
    User
        .create(newUserObject(req))
        .then(() => {
            res.sendStatus(201);
        })
        .catch(next);
}

async function authenticateUser(req, res) {
    User
        //.findOne({username: req.body.username, password: req.body.password})
        .findOne({username: req.body.username['username'], password: req.body.password['password']})
        .exec()
        .then(doc => {
            /*if(doc) {
                res.sendStatus(200);
            }
            else {
                res.sendStatus(401);
            }*/
            if(doc) {
                res.send({login: 'success'});
            } else {
                res.send({login: 'fail'});
            }
        })
    //.catch(next);
}

/*
async function getUserCaseStudies(req, res, next) {
    User
        .findOne({username: req.query.username})
        .populate({path: 'case_studies', select: req.query.status})
        .select('case_studies')
        .exec()
        .then(doc => {
            if(doc && doc.get('case_studies').length > 0) {
                res.status(201).send(doc.get('case_studies'));
            }
            else {
                res.sendStatus(401);
            }
            next();
        })
        .catch(next);
}
*/
