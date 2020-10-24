const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const passportConf = require('../passport');

const { validateBody, schemas } = require('../helpers/route.helper');
const UsersController = require('../controllers/users');
const passportJWT = passport.authenticate('jwt', { session: false });
const passportGoogle = passport.authenticate('googleToken', { session: false });
const passportFacebook = passport.authenticate('facebookToken', { session: false });

// Custom express routing middleware that checks to see if the authenticated user is an admin
const requireAdmin = require('../requireAdmin');

// Create routes and assign functions to each route
router.route('/login')
    .post(validateBody(schemas.authSchema), UsersController.login);

router.route('/admin')
    .get(validateBody(schemas.authSchema), passportJWT, requireAdmin, UsersController.AdminAuth);

router.route('/oauth/google')
.post(passportGoogle, UsersController.googleOAuth);

router.route('/oauth/facebook')
    .post(passportFacebook, UsersController.facebookOAuth);

router.route('/secret')
    .get(passportJWT, UsersController.secret);

module.exports = router;