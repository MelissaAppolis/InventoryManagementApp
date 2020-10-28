// User configurations for facebook and google and JWT secret
// if on production site, use prod.js config file else if on development site use dev.js config file
if(process.env.NODE_ENV === 'production') {
    module.exports = require('./prod')
} else {
    module.exports = require('./dev')
}