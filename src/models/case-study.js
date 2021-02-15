const mongoose = require('mongoose');

const CaseStudySchema = new mongoose.Schema({
    //owner {type: String, required: true},
    project_name: {type: String, required: true},
    project_industry: {type: String},
    project_start_date: {type: String, default: Date.now},
    project_end_date: {type: String},
    //project_city: {type: String},
    //project_country: {type: String},
    problem_space: {type: String},
    idea: {type: String},
    approach: {type: String},
    impact: {type: String},
    status: {type: String},
    tags: {type: [String]},
    //client: {type: mongoose.Schema.Types.ObjectID, ref: 'Client'}

    employee_id: {type: String},
    city: {type: String},
    country: {type: String},
    client_name: {type: String},
    client_code_name: {type: String},
    client_phone: {type: String},
    client_email: {type: String},
});

module.exports = mongoose.model('CaseStudy', CaseStudySchema, 'casestudies');
