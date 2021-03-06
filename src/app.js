const
    express = require('express'),
    cors = require('cors'),
    mongoose = require("mongoose"),
    IndexRouter = require('./routes/index');
    LoginRouter = require('./routes/login');

/*
 * Assign Application level middleware,
 */
const app = express();
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/', IndexRouter);
app.use('/', LoginRouter);

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
