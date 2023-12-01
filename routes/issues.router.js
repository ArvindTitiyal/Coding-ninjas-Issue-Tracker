const express = require('express');
// For using params from app.js
const router = express.Router({ mergeParams: true }); 

/* Local Imports */
// For catching asynchronous errors
const catchAsync = require('../utils/catchAsync.util'); 
const { validateIssue, isLoggedIn, isIssueAuthor } = require('../middleware');
const {
  handleAddIssue,
  handleDeleteIssue,
} = require('../controllers/issues.controller');

// Add review for Campground :
router.post('/', isLoggedIn, validateIssue, catchAsync(handleAddIssue));

// Delete review for Campground :
router.delete(
  '/:issueId',
  isLoggedIn,
  isIssueAuthor,
  catchAsync(handleDeleteIssue)
);

module.exports = router;
