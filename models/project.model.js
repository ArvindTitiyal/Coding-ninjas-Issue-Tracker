const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Issue = require('./issue.model');

const ProjectSchema = new Schema({
  title: String,
  description: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  issues: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Issue',
    },
  ],
});

// After deleting a project, delete all associated issues
// This post middleware is triggered when using "findOneAndDelete"
// It ensures that associated issues are removed when a project is deleted
ProjectSchema.post('findOneAndDelete', async function (project) {
  if (project) {
    await Issue.deleteMany({ _id: { $in: project.issues } });
  }
});

// Create the Project model
const Project = new mongoose.model('Project', ProjectSchema);

module.exports = Project;
