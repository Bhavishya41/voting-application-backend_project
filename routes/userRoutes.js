const express = require("express");
const router = express.Router();
const User = require("./../models/user");
const {jwtAuthMiddleware, generateToken} = require("./../jwt");
let adminCount = 0;

router.post('/signup', async (req, res) => {
    try {
        const data = req.body;

        // Check if trying to create an admin
        if (data.role === "admin") {
            const existingAdmin = await User.findOne({ role: "admin" });
            if (existingAdmin) {
                return res.status(401).json({ message : 'there cant be more than 1 admin' });
            }
        }

        const newUser = new User(data);
        const response = await newUser.save();

        console.log('data saved');

        const payload = { id: response.id };
        const token = generateToken(payload);

        res.status(200).json({ response: response, token: token });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

// Login Route
router.post('/login', async(req, res) => {
    try{
        // Extract username and password from request body
        const {aadharCardNumber, password} = req.body;

        // Find the user by username
        const user = await Person.findOne({aadharCardNumber: aadharCardNumber});

        // If user does not exist or password does not match, return error
        if( !user || !(await user.comparePassword(password))){
            return res.status(401).json({error: 'Invalid username or password'});
        }

        // generate Token 
        const payload = {
            id: user.id,
        }
        const token = generateToken(payload);

        // resturn token as response
        res.json({token})
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Profile route
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
    try{
        const userData = req.user;
        const userId = userData.id;
        const user = await Person.findById(userId);

        res.status(200).json({user});
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.put('/profile/password', jwtAuthMiddleware, async (req, res) => {
    try {
        const userId = req.user.id; // Extract the id from the token
        const { currPassword, newPassword } = req.body;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (!(await user.comparePassword(currPassword))) {
            return res.status(401).json({ error: 'Incorrect password' });
        }

        user.password = newPassword;
        await user.save();

        console.log('password changed successfully');
        res.status(200).json({ message: "password updated" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;