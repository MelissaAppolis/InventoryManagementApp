const JWT = require('jsonwebtoken');
const User = require('../models/user.model');
const { JWT_SECRET } = require('../config/keys');
const ROLES = require('../utils/roles');


signToken = user => {
    return JWT.sign({
    iss: 'InventoryApp',
    sub: user.id,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 1), // Current time + 1 day ahead
    role: user.role
    }, JWT_SECRET);
}

/* Create a login function to request values of email, password and isAdmin. 
Create a new user, generate and respond with a token */
module.exports = {
    login: async (req, res, next) => {
        const email = req.value.body.email;
        const password = req.value.body.password;
        const isAdmin = req.value.body.isAdmin;

        // Create a new user
        const newUser = new User({ 
            method: 'local',
            local: {
                email: email, 
                password: password ,
                role: isAdmin ? ROLES.Admin : ROLES.User
            }
        });
        await newUser.save();

        // Generate the token
        const token = signToken(newUser);
        
        // Respond with token
        res.status(200).json({ token, role: newUser.local.role });
    },
    googleOAuth: async (req, res, next) => {
        //Generate token
        const token = signToken(req.user);
        res.status(200).json({ token })
    },

    facebookOAuth: async (req, res, next) => {
        //Generate token
        const token = signToken(req.user);
        res.status(200).json({ token })
    },
    secret: async (req, res, next) => {
        console.log('I managed to get here');
        res.json({ secret: "resource" });
    },
    AdminAuth: async (req, res, next) => {
        const token = signToken(req.user);
        res.status(200).json({ token });
    }
}