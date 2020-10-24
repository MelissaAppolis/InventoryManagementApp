const Joi = require('joi'); 

// Importing Joi and created a validator which is able to validate the Request object against the schema object.
// Validate whether user email and password is correct or not
module.exports = {
    validateBody: (schema) => {
        return (req, res, next) => {
            const result = schema.validate(req.body);
            if (result.error) {
                return res.status(400).json(result.error);
            }
            if (!req.value) { req.value = {}; }
            req.value['body'] = result.value;
            next();
        }
    },

    schemas: {
        authSchema: Joi.object().keys({
            email: Joi.string().required(),
            password: Joi.string().required(),
            isAdmin: Joi.boolean().optional()
        })
    }
}