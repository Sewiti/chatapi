const express = require('express');
const Joi = require('@hapi/joi');
const User = require('../models/User');
const argon2 = require('argon2');
const { usernameValidator } = require('../validators');

const router = express.Router();


// Register
router.post('/', async (req, res) => {
    const schema = Joi.object({
        displayName: Joi.string().min(3).max(30).default(req.body.username),
        username:    Joi.string().min(3).max(30).required().alphanum().external(usernameValidator),
        password:    Joi.string().min(6).max(99).required()
    });

    
    schema.validateAsync(req.body)
    .then(
        // onfulfilled
        async (values) => {
            const hashedPassword = await argon2.hash(values.password);

            const user = new User({
                displayName: values.displayName,
                username:    values.username,
                password:    hashedPassword,
            });

            try {
                const savedUser = await user.save();
                res.json(savedUser);
            }
            catch (err) {
                res.status(500).json({ message: err.message });
            }
        },
        
        // onrejected
        (reason) => {
            res.status(400).json({ message: reason.message });
        }
    );
});


module.exports = router;
