const express = require('express');
const router = express.Router();
const User = require('../models/user.model'); 
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');


router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    try {
       
        let existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }

        
        const newUser = new User({ username, email, password });

        
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);

        
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } 
    catch (error) {
        console.error('Error registering user:', error);

        res.status(500).json({ message: 'Internal Server Error' });
    }
});


router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
   
        const payload = {
            user: { username: user.username, },
        };

        jwt.sign( payload, 'key', { expiresIn: '1h' }, );
    } 
    catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
