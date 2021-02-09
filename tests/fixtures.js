const
    app = require('../src/app'),
    mongoose = require("mongoose");

/* Connection parameters */
const
    port = 3001,
    uri = 'mongodb+srv://admin:admin@ibmcasestudies.mni5s.mongodb.net/backend_testing?retryWrites=true&w=majority';

exports.mochaGlobalSetup = setup;
exports.mochaGlobalTeardown = teardown

async function setup() {
    app.server = app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });

    await mongoose
        .connect(uri, {useNewUrlParser:true, useUnifiedTopology:true, autoIndex: false})
        .then(() => console.log('Connected to Database'))
        .catch(reason => console.log(`Failed to connect to Database\n\t${reason.message}`));
}

async function teardown() {
    await mongoose.connection.collections['users'].deleteMany({}).catch(reason => {console.log(reason)});
    await mongoose.connection.collections['clients'].deleteMany({}).catch(reason => {console.log(reason)});
    await mongoose.connection.collections['case_studies'].deleteMany({}).catch(reason => {console.log(reason)});
    await mongoose.disconnect().catch(reason => console.log(`Failed to disconnect from Database\n\t${reason.message}`));
    app.server.close((err) => {
        if(err) {
            console.log(`Failed to close server\n\t${err.message}`);
        } else {
            console.log(`Closed server`);
        }
    });
}