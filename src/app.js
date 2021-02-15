const
    express = require('express'),
    cors = require('cors'),
    UserAdapter = require('./models/user'),
    ClientAdapter = require('./models/user'),
    CaseStudyAdapter = require('./models/user');

const app = express();

/*
 * Instantiate and configure a router,
 * Could assign middleware directly to app,
 *  but doing it this way helps to differentiate between middleware applied to specific paths,
 *  against those applied to all paths.
 */

const router = express.Router();
//router.post('/register', Adapter.UserAdapter.createUser);
router.post('/login', UserAdapter.authenticateUser);
//router.get('/view/:id', CaseStudyAdapter.getCaseStudy);
//router.get('/search', CaseStudyAdapter.getManyCaseStudies);
router.post('/view-by-id1', CaseStudyAdapter.getCaseStudy);
router.post('/searchtags', CaseStudyAdapter.getManyCaseStudies);
router.post('/create', CaseStudyAdapter.createCaseStudy);
router.post('/update', CaseStudyAdapter.updateCaseStudy);
router.get('/view-all', CaseStudyAdapter.getAllCaseStudies);
router.post('/view-your-cs-draft', [CaseStudyAdapter.modifyRequestForDrafts, CaseStudyAdapter.getUserCaseStudies]);
router.post('/view-your-cs-published', [CaseStudyAdapter.modifyRequestForPublished, CaseStudyAdapter.getUserCaseStudies]);
router.get('/fetch-pdf', CaseStudyAdapter.getPDF);
router.post('/create-pdf', CaseStudyAdapter.createPDF);

/*
 * Assign Application level middleware,
 */
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/', router)

module.exports = app;
