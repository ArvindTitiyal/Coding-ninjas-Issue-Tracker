const express = require('express');
const router = express.Router();

/* Local Imports */
// For catching asynchronous errors
const catchAsync = require('../utils/catchAsync.util'); 
const { isLoggedIn, validateProject, isAuthor } = require('../middleware');
const {
  handleGetAllProjects,
  handleGetOneProject,
  handleRenderAddProject,
  handleAddProject,
  handleDeleteProject,
} = require('../controllers/projects.controller');

// Get Project:
router.get('/', catchAsync(handleGetAllProjects));
router.get('/oneProject/:id', catchAsync(handleGetOneProject));

// Add Project:
router
  .route('/newProject')
  .get(isLoggedIn, handleRenderAddProject)
  .post(isLoggedIn, validateProject, catchAsync(handleAddProject));

// Delete Project :
router.delete(
  '/deleteProject/:id',
  isLoggedIn,
  isAuthor,
  catchAsync(handleDeleteProject)
);

module.exports = router;
