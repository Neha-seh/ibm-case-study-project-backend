const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    employee_id: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    name: {type: String},
    email: {type: String},
    case_studies: [{type: mongoose.Schema.Types.ObjectId, ref: 'CaseStudy'}]
});

module.exports = mongoose.model('User', UserSchema, 'users');
