const express = require('express');
const router = express.Router();
const User = require('../schema/User');
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser');

const JWT_SECRET = process.env.JWT_SECRET;

// ROUTE 1 : CREATE A USER USING :POST "/API/AUTH/CREATEUSER" : No login required
router.post('/createUser', [
    body('name', 'Enter a valid name').isLength({min: 3}),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Passwod must be atleat 8 characters').isLength({min: 8})
], async (req, res) => {
    let success = false;
    // If there are Error, return bad request and errors
    const error = validationResult(req);
    if(!error.isEmpty()) {
        return res.status(400).json({success, error: error.array()});
    }

    try {
        // check whether the user with this email exists already
        let user = await User.findOne({email: req.body.email})
        if(user) {
            return res.status(400).json({success, error: "User already exists with this email" })
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        // Create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        });
        const data = {
            user:{
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authToken})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


// ROUTE 2 : AUTHENTICATE A USER USING :POST "/API/AUTH/LOGIN" : No login required
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Passwod cannot be blank').exists({min: 8})
], async (req, res) => {
    let success = false;
    // If there are Error, return bad request and errors
    const error = validationResult(req);
    if(!error.isEmpty()) {
        return res.status(400).json({error: error.array()});
    }
    
    const {email, password} = req.body;
    
    try{
        let user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({success, error: "Login with correct credentials"});
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare) {
            return res.status(400).json({success, error: "Login with correct credentials"});
        }
        
        const data = {
            user:{
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authToken});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


// ROUTE 3 : GET LOGGEDIN USER DETAILS USING : POST "API/AUTH/GETUSER". LOGIN REQUIRED
router.post('/getUser', fetchUser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user);
    } catch (error) {
        console.error(error.message);
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
})


module.exports = router