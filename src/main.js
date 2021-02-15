const
    app = require('./app'),
    mongoose = require("mongoose");

/* Connection parameters */
const port = 3001;
const uri = 'mongodb+srv://admin:admin@ibmcasestudies.mni5s.mongodb.net/ibmcasestudies?retryWrites=true&w=majority';

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

mongoose
    .connect(uri, {useNewUrlParser:true, useUnifiedTopology:true, autoIndex: false})
    .then(() => console.log('Connected to Database'))
    .catch(reason => console.log(`Failed to connect to Database\n\t${reason.message}`));
