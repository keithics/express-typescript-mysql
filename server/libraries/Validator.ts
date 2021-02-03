const { body, validationResult, check } = require('express-validator')

export class Validator {

    static required(field) {
        return body(field).not().isEmpty().withMessage(field + ' is required')
    }

    static isEmail(field) {
        return body(field).isEmail().withMessage(field + ' must be a valid email format')
    }

    static phone(field) {
        return body(field).custom((value) => {

            if (value) {
                // 11 digits, starts with 0 and is a number
                return value.length === 11 && value.substring(0, 1) === '0' && !isNaN(value)
            } else {
                return true
            }

        }).withMessage(' phone must be a valid format, eg: 11 digit and starts with zero 09989876543')
    }

    static isArray(field) {
        return body(field).isArray().withMessage(field + ' must be an array')
    }

    static isIn(field, values) {
        return body(field).optional().isIn(values).withMessage(field + ' must be either ' + values.toString())
    }

    static isNumber(field) {
        return body(field).isInt().withMessage(field + ' must be a number')
    }

    static minLength(field, length) {
        return body(field).isLength({ min: length }).withMessage(field + ' must be at minimum length of ' + length )
    }

    static maxLength(field, length) {
        return body(field).isLength({ max: length }).withMessage(field + ' must be at maximum length of ' + length )
    }


    static validate = (req, res, next) => {
        const errors = validationResult(req)
        if (errors.isEmpty()) {
            return next()
        }
        return res.status(422).json({ message: errors.array()[0].msg })
    }
}

