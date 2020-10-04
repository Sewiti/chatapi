const express = require('express');
const Joi = require('@hapi/joi');
const User = require('../models/User');
const argon2 = require('argon2');

const router = express.Router();





// Conversations
router.get('/', async (req, res) => {
    res.status(404).json({ message: 'hi' });
});


module.exports = router;
