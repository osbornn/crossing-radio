const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user-model.js');

router.post('/register', async (req, res) => {
    console.log(req.body);
    const { username, password } = req.body;

    const existingUser = await User.findOne({username});
    if(existingUser) {
        return res.status(400).json({msg: 'This user already exists!'});
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
        username,
        password: hashedPassword
    });

    try {
        await newUser.save();
        res.status(201).json({msg: 'Hurray! Your account is now created!'});
    } catch(error) {
        console.error(error);
        res.status(500).send('Uh oh... Something went wrong...');
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({username});
    if(!user) {
        return res.status(400).json({msg: 'Invalid username or password'});
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);
    if(!passwordsMatch) {
        return res.status(400).json({msg: 'Invalid username or password'});
    }

    //We generate a session token
    const token = jwt.sign({ userId: user._id }, 'jwt_crossing', { expiresIn: '1h'});

    res.status(200).json({ token, user: { id: user._id, username: user.username, email: user.email }});

});

module.exports = router;

