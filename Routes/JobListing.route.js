const express=require("express");
const { JobModel } = require("../Models/Job.model");

const JobListingRouter=express.Router();

JobListingRouter.get("/",async(req,res)=>{
        try {
          const page = parseInt(req.query.page) || 1; // Current page number
          const limit = 10; // Number of items per page
      
          const searchTechStack = req.query.techStack; // Example: ?techStack=techValue
          const filterRole = req.query.filter; // Example: ?filter=roleValue
          const sortBy = req.query.sortBy; // Example: ?sortBy=date
          const sortOrder = req.query.sortOrder; // Example: ?sortOrder=asc
      
          let query = JobModel.find();
      
          // Apply search/filtering
          if (searchTechStack) {
            query = query.find({ techStack: { $regex: searchTechStack, $options: 'i' } });
          }
          if (filterRole) {
            query = query.find({ role: filterRole });
          }
      
          // Apply sorting
          if (sortBy && sortOrder) {
            const sortOptions = {};
            sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;
            query = query.sort(sortOptions);
          }
      
          // Apply pagination
          const totalItems = await JobModel.countDocuments(query);
          const totalPages = Math.ceil(totalItems / limit);
          const skip = (page - 1) * limit;
      
          query = query.skip(skip).limit(limit);
      
          const items = await query.exec();
      
          res.json({ items, totalPages, currentPage: page });
        } catch (error) {
          // Handle the error
          res.status(500).json({ error: 'Internal Server Error' });
        }
    
})

module.exports={
    JobListingRouter
}