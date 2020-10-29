module.exports = {
    dev: {
    "default-src": ["'self'"],
    "style-src": [
      "'self'",
      "https://*.google.com",
    ]
    },
    prod: {
    "script-src": ['https://connect.facebook.net/en_US/sdk.js', 'https://apis.google.com/js/api.js',"'unsafe-inline'", "'unsafe-eval'", "'self'"],
    "default-src": ['https://connect.facebook.net/en_US/sdk.js', 'https://apis.google.com/js/api.js',"'unsafe-inline'", "'unsafe-eval'", "'self'"],  // can be either a string or an array.
    "style-src": [
      "'self'",
      "https://*.facebook.com",
    ],
    "connect-src": [
      "'self'",
      "https://mybackend.com"
    ]
    }
  }