const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
    name: {type: String, required: true},
    code_name: {type: String},
    contact_number: {type: String},
    contact_email: {type: String},
    case_studies: [{type: mongoose.Schema.Types.ObjectId, ref: 'CaseStudy'}]
});

module.exports = mongoose.model('Client', ClientSchema, 'clients');
