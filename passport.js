const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-token-google').Strategy;
const FacebookTokenStrategy = require('passport-facebook-token');
const { JWT_SECRET } = require('./config/keys');
const User = require('./models/user.model');
const { exist } = require('joi');
const config = require('./config/keys');

// JSON WEB TOKENS STRATEGY
/* Use JwtStrategy, this strategy is aware of where this token will be coming from 
and what secret should be used to decode it.*/
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: JWT_SECRET
}, async (payload, done) => {
    try {
        // Find the user specified in token
        const user = await User.findById(payload.sub);
        
        // If user doesnt exists, handle it
        if (!user) {
            return done(null, false);
        }

        //Otherwise, return the user
        done(null, user);

    } catch(error) {
        done(error, false);
    }
}));

// GOOGLE OAUTH STRATEGY
passport.use('googleToken', new GoogleStrategy({
    clientID: config.GOOGLE_CLIENTID,
    clientSecret: config.GOOGLE_CLIENTSECRET
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // Check whether this current user exists in our DB
        const existingUser = await User.findOne({ "google.id": profile.id });
        if (existingUser) {
            return done(null, existingUser);
        }

        // If new account
        const newUser = new User({
            method: 'google',
            google: {
                id: profile.id,
                email: profile.emails[0].value
            }
        });

        await newUser.save();
        done(null, newUser);

    } catch(error) {
        done(error, false, error.message);
    }   
}));

// FACEBOOK STRATEGY
passport.use('facebookToken', new FacebookTokenStrategy({
    clientID: config.FACEBOOK_CLIENTID,
    clientSecret: config.FACEBOOK_CLIENTSECRET
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // Check whether this current user exists in our DB
        const existingUser = await User.findOne({ "facebook.id": profile.id });
        if (existingUser) {
            return done(null, existingUser);
        }

        // If new account
        const newUser = new User({
            method: 'facebook',
            facebook: {
                id: profile.id,
                email: profile.emails[0].value
            }
        });

        await newUser.save();
        done(null, newUser);
    } catch(error) {
        done(error, false, error.message);
    }
}));


// LOCAL STRATEGY
// Authorize user using email and password
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        // Check whether this current user exists in our DB
        const existingUser = await User.findOne({ "local.email": email });
        if (existingUser) {
            return done(null, existingUser);
        }

        // Find the user given the email
        const user = await User.findOne({ "local.email": email })

        // If not, handle it
        if (!user) {
            return done(null, false);
        }

        // Check if the password is correct
        const isMatch = await user.isValidPassword(password);

        // If not, handle it
        if (!isMatch) {
            return done(null, false);
        }

        // Otherwise, return the user
        done(null, user);
    } catch(error) {
        done(error, false);
    } 
}));