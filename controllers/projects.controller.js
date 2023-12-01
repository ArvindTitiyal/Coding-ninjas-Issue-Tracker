/* Local Imports */
const Project = require('../models/project.model');

// Get all projects and populate author information:
const handleGetAllProjects = async (req, res) => {
  const projects = await Project.find({}).populate('author');
  res.render('projects/allProjects', { projects });
};

// Get details for a specific project, including issues and author information:
const handleGetOneProject = async (req, res) => {
  const project = await Project.findById(req.params.id)
    .populate({ path: 'issues', populate: { path: 'author' } })
    .populate('author');
  // If project not found
  if (!project) {
    return res.redirect('/');
  }
  res.render('projects/oneProject', { project });
};

// Render the form to add a new project:
const handleRenderAddProject = (req, res) => {
  res.render('projects/newProject');
};

// Add a new project to the database:
const handleAddProject = async (req, res, next) => {
  const project = await Project.create({
    ...req.body,
    author: req.user._id,
  });
  res.redirect(`/oneProject/${project._id}`);
};

// Delete a project from the database::
const handleDeleteProject = async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.redirect('/');
};

module.exports = {
  handleGetAllProjects,
  handleGetOneProject,
  handleRenderAddProject,
  handleAddProject,
  handleDeleteProject,
};
