// User configurations for facebook and google and JWT secret
module.exports = {
    JWT_SECRET: 'inventoryUserAuthentication',
    oauth: {
        google: {
            clientID: '1024070526390-5t96st7l1ng0uldormdspbo6i0dbrk24.apps.googleusercontent.com',
            clientSecret: 'gOlNZmYqQWrnUiy8-ZR_bSUs'
        },
        facebook: {
            clientID: '1710043372493359',
            clientSecret: '9a76804eb4a564e3d10e854257f66bab'
        },
    },
    mongoURI: "mongodb+srv://Melissa:melissaPassword@hyperion-dev-1234.a0z2n.mongodb.net/InventoryManagement?retryWrites=true&w=majority"
}