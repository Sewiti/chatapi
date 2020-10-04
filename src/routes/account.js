const express = require('express');
const Joi = require('@hapi/joi');
const User = require('../models/User');
const { usernameValidator } = require('../validators');

const router = express.Router();


// Check for availability
router.get('/available', (req, res) => {
    const schema = Joi.object({
        username: Joi.string().min(3).max(30).required().alphanum().external(usernameValidator)
    });


    schema.validateAsync(req.body)
    .then(
        // onfulfilled
        () => { res.json({ available: true }); },
        
        // onrejected
        (reason) => { res.json({ available: false, message: reason.message }); }
    );
});


// Info
router.get('/:username', (req, res) => {
    const schema = Joi.object({
        username: Joi.string().required().alphanum()
    });

    schema.validateAsync(req.params)
    .then(
        // onfulfilled
        async (values) => {
            try {
                const user = await User.findOne({ username: values.username });

                res.json({
                    displayName: user.displayName,
                    username:    user.username,
                    joined:      user.joined
                });
            }
            catch {
                res.status(404).json({ message: 'User doesn\'t exist.' });
            }
        },
        
        // onrejected
        (reason) => {
            res.status(400).json({ message: reason.message });
        }
    );
});


module.exports = router;
