const express = require('express');
const router = express.Router();
const User = require('../model/users'); 
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');


router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body; // Adjusted to receive name and email

    try {
        // Check if the email already exists
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists', success: false });
        }

        // Assuming your User model accepts a name and email
        const newUser = new User({ name, email, password });

        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);

        await newUser.save();

        // Added success: true for the client-side check
        res.status(201).json({ message: 'User registered successfully', success: true });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal Server Error', success: false });
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
