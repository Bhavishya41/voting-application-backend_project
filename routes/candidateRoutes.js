const express = require("express");
const router = express.Router();
const Candidate = require("./../models/candidate");
const User = require("./../models/user");
const {jwtAuthMiddleware, generateToken} = require("./../jwt");

const checkAdminRole = async (userId) => {
    try{
        const user = await User.findById(userId);
        return user.role === "admin";
    }catch(err){
        return false;
    }
}

// POST route to add candidate  
router.post('/', jwtAuthMiddleware, async (req, res) =>{
    try{
        if(! await checkAdminRole(req.user.id)){
            return res.status(403).json({message:"user has no admin role"});
        }
        const data = req.body // Assuming the request body contains the person data

        // Create a new Person document using the Mongoose model
        const newCandidate = new Candidate(data);

        // Save the new person to the database
        const response = await newCandidate.save();
        console.log('data saved');
        res.status(200).json({response: response});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.put('/:candidateId', jwtAuthMiddleware, async (req, res)=>{
    try{
        if(! await checkAdminRole(req.user.id)){
            return res.status(403).json({message:"user has no admin role"});
        }
        const candidateId = req.params.candidateId; // Extract the id from the URL parameter
        const updatedCandidateData = req.body; // Updated data for the person

        const response = await Candidate.findByIdAndUpdate(candidateId, updatedCandidateData, {
            new: true, // Return the updated document
            runValidators: true, // Run Mongoose validation
        })

        if (!response) {
            return res.status(404).json({ error: 'candidate not found' });
        }

        console.log('data updated');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.delete('/:candidateId', jwtAuthMiddleware, async (req, res)=>{
    try{
        if(! await checkAdminRole(req.user.id)){
            return res.status(403).json({message:"user has no admin role"});
        }
        const candidateId = req.params.candidateId; // Extract the id from the URL parameter
        const updatedCandidateData = req.body; // Updated data for the person

        const response = await Candidate.findByIdAndDelete(candidateId);

        if (!response) {
            return res.status(404).json({ error: 'candidate not found' });
        }

        console.log('candidate deleted');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.post("/vote/:candidateId", jwtAuthMiddleware, async (req,res) => {
    candidateId = req.params.candidateId;
    userId = req.user.id;

    try{
        const candidate = await Candidate.findById(candidateId);
        if(!candidate){
            return res.status(404).json({ error: 'candidate not found' });
        }

        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({ error: 'user not found' });
        }

        if(user.isVoted){
            return res.status(400).json({message:"you have already voted"});
        }

        if(user.role === "admin"){
            return res.status(402).json({message:"admin is not allowed to vote"});
        }

        candidate.votes.push({user:userId});
        candidate.voteCount++;
        await candidate.save();

        user.isVoted = true;
        await user.save();

        res.status(200).json({message: "the vote has been recorded"})
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.get("/vote/count", async (req,res) => {
    try{
        const candidates = await Candidate.find().sort({voteCount: 'desc'});
        
        const record = candidates.map((data) => {
            return{
                party: data.party,
                count: data.voteCount
            }
        });

        res.status(200).json(record);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.get("/candidates", async (req,res) => {
    try{
        //show the list of all candidates
        const list = await Candidate.find();
        if(!list){
            return res.status(404).json({message: "there are no candidates"});
        }

        return res.status(200).json(list);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

module.exports = router;