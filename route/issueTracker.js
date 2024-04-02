const express = require('express');
const router = express.Router();
const { issueTrackerPage, createProject, addProject, projectDetails, createAnIssue, addAnIssue, deleteIssue } = require('../controller/issueController');
router.get('/', issueTrackerPage);
router.get('/createProject', createProject);
router.post('/addProject', addProject);
router.get('/projectDetails', projectDetails)
router.get('/createAnIssue/:id', createAnIssue)
router.post('/create-issue/:id/add-issue', addAnIssue);
router.get('/delete-issue/:projectId/:bugId', deleteIssue);
module.exports = router;