const express = require('express');
const Joi = require('@hapi/joi');
const User = require('../models/User');
const argon2 = require('argon2');

const router = express.Router();


// Login
router.get('/', async (req, res) => {
    const schema = Joi.object({
        username: Joi.string().min(3).max(99).required().alphanum(),
        password: Joi.string().min(3).max(99).required()
    });

    
    schema.validateAsync(req.body)
    .then(
        // onfulfilled
        async (values) => {
            try {
                const user = await User.findOne({ username: values.username });
                const valid = await argon2.verify(user.password, values.password);
        
                if (valid) {
                    res.json(user);
                }
                else {
                    res.status(400).json({ message: 'Wrong password.' });
                }
            }
            catch {
                res.status(404).json({ message: 'User doesn\'t exist.' });
            }
        },
        
        // onrejected
        (error) => {
            res.status(400).json({ message: error.message });
        }
    );
});


module.exports = router;
