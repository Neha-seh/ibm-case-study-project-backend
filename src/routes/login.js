const router = require('express').Router();
const User = require('../models/user');

router.post('/login', authenticateUser);

module.exports = router;

async function authenticateUser(req, res) {
    User
        .findOne({username: req.body.username['username'], password: req.body.password['password']})
        .exec()
        .then(doc => {
            if(doc) {
                res.send({login: 'success'});
            } else {
                res.send({login: 'fail'});
            }
        })
}
