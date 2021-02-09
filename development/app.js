const
    express = require('express'),
    cors = require('cors'),
    Adapter = require('./central-adapter');

const app = express();

/*
 * Instantiate and configure a router,
 * Could assign middleware directly to app,
 *  but doing it this way helps to differentiate between middleware applied to specific paths,
 *  against those applied to all paths.
 */

const router = express.Router();
//router.post('/register', Adapter.UserAdapter.createUser);
router.post('/login', Adapter.UserAdapter.authenticateUser);
//router.get('/view/:id', Adapter.CaseStudyAdapter.getCaseStudy);
//router.get('/search', Adapter.CaseStudyAdapter.getManyCaseStudies);
router.post('/view-by-id1', Adapter.CaseStudyAdapter.getCaseStudy);
router.post('/searchtags', Adapter.CaseStudyAdapter.getManyCaseStudies);
router.post('/create', Adapter.CaseStudyAdapter.createCaseStudy);
router.post('/update', Adapter.CaseStudyAdapter.updateCaseStudy);
router.get('/view-all', Adapter.CaseStudyAdapter.getAllCaseStudies);
router.post('/view-your-cs-draft', [Adapter.modifyRequestForDrafts, Adapter.getUserCaseStudies]);
router.post('/view-your-cs-published', [Adapter.modifyRequestForPublished, Adapter.getUserCaseStudies]);
router.get('/fetch-pdf', Adapter.getPDF);
router.post('/create-pdf', Adapter.createPDF);

/*
 * Assign Application level middleware,
 */
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/', router)

module.exports = app;
