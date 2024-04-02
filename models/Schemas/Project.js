const mongoose = require('mongoose');

let BugSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: new mongoose.Types.ObjectId()
    },
    issueName: {
        type: String,
        required: true
    },
    issueDescription: {
        type: String,
        required: true
    },
    authorName: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

let ProjectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    authorName: {
        type: String,
        required: true,
    },
    bugs: [BugSchema],
},{
    timestamps: true,
});
const Project = mongoose.model('Project',ProjectSchema);
module.exports = Project;