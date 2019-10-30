const jwt = require('express-jwt')

exports.authenticated = jwt({secret: 'our-secret-key'})