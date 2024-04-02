// const mongodb = require('../database/mongodb');
const mongoose = require("mongoose")

const Project = require('../models/Schemas/Project');
const issueTrackerPage = async function(req, res){
    // const collection = await mongodb();
    const addedProject = await Project.find({});
    return res.render('issueTracker',{
        title: 'Issue Tracker',
        addedProject
    });
}
const createProject = async function(req, res){
    return res.render('createProject',{
        title: 'Create Project',
    })
}
const addProject = async function(req, res){
    let formData = req.body;
    console.log(formData);
    // formData = {...formData, id: 'addedProject'};
    // const collection = await mongodb();
    try{
        let newProject = new Project(formData);
        await newProject.save();
        res.redirect('/issueTracker');
    }catch(err){
        console.log(err);
    }
    // Project.insertOne(formData, (err,data)=>{
    //     if(err){
    //         throw new Error;
    //     }else if(data){
    //         console.log('data inserted');
    //     }
    // });
    // res.redirect('/issueTracker');
}
const projectDetails = async function(req, res){
    // const collection = await mongodb();
    let projectDetails = await Project.find({});
    return res.render('projectDetails',{
        title: 'Project Details',
        projectDetails
    });
}
const createAnIssue = async function(req, res){
    const projectId = req.params;
    return res.render('createIssue',{
        title: 'Issue create',
        projectId
    });
}
const addAnIssue = async function(req, res){
    try{
        const id = req.params.id;
        // console.log(id);
        await Project.findByIdAndUpdate(id,{$push: {bugs: req.body}}, {new: true});
        res.redirect('/issueTracker/projectDetails');
    }catch(err){
        console.log(err);
    }
}
const deleteIssue = async function(req, res){
    try{
        const projectId = req.params.projectId;
        const bugId = req.params.bugId;
        // long way with no optimization
        // const project = await Project.findById(projectId);
        // if(!project){
        //     return res.status(404).send("Project not exist");
        // }
        // const bugIndex = project.bugs.findIndex(bug=> bug._id.toString() === bugId);
        // if(bugIndex === -1){
        //     return res.status(404).send("Bug not exist");
        // }
        // project.bugs.splice(bugIndex, 1);
        // await project.save();

        // short way and more optimized
        const result = await Project.updateOne({ _id: projectId }, { $pull: { bugs: { _id: bugId } } });
        if(result.nModified === 0){
            return res.status(404).send("Project or Bug not exist");
        }
        // res.status(200).send("Child document deleted successfully");
        res.redirect('/issueTracker/projectDetails');
    }catch(err){
        console.log(err);
    }
}
module.exports = {issueTrackerPage, createProject, addProject, projectDetails, createAnIssue, addAnIssue, deleteIssue};