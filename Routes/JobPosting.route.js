const express=require("express");
const { JobModel } = require("../Models/Job.model");

const JobPostingRouter=express.Router();

JobPostingRouter.post("/",async(req,res)=>{
        const payload=req.body;
        try {
            const jobAdded=new JobModel(payload);
            await jobAdded.save();
            res.send({"msg":"Added Succesfully"})
        } catch (error) {
            res.send("some Error")
        }
})

module.exports={
    JobPostingRouter
}