const
    mongoose = require('mongoose'),
    User = require('../src/models/user');

//const uri = 'mongodb+srv://admin:admin@ibmcasestudies.mni5s.mongodb.net/ibmcasestudies?retryWrites=true&w=majority';
const uri = 'mongodb+srv://admin:admin@ibmcasestudies.mni5s.mongodb.net/backend_testing?retryWrites=true&w=majority';

Promise
    .resolve()
    .then(() => mongoose.connect(uri, {useNewUrlParser:true, useUnifiedTopology:true}))
    .then(createIndexes)
    .then(createUsers)
    .then(() => mongoose.connection.close())
    .catch(console.log)

/*
 * Create database indexes
 */
async function createIndexes() {
    await mongoose.connection
        .collection('users')
        .createIndex({employee_id: 1}, {unique: true})
        .catch(console.log);

    await mongoose.connection
        .collection('users')
        .createIndex({username: 1}, {unique: true})
        .catch(console.log);

    await mongoose.connection
        .collection('clients')
        .createIndex({name: 1}, {unique: true})
        .catch(console.log);

    await mongoose.connection
        .collection('case_studies')
        .createIndex({"$**": "text"})
        .catch(console.log);

    await mongoose.connection
        .collection('case_studies')
        .createIndex({tags: 1})
        .catch(console.log);
}

/*
 * Front end functionality to register a user is not currently implemented, so we use this function as a substitute
 */
async function createUsers() {
    const user = new User({
        employee_id: '1',
        username: 'ibm',
        password: 'ibm'
    });
    await User
        .create(user)
        .catch(console.log);
}
