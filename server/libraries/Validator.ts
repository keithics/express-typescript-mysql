const { body, validationResult, check } = require('express-validator')

/**
 * Validator Class for global validations
 */
export class Validator {

    /**
     * Required validations
     * @param field field to check
     */
    static required(field) {
        return body(field).not().isEmpty().withMessage(field + ' is required')
    }

    /**
     * Checks if the field is an email
     * @param field field to check
     */
    static isEmail(field) {
        return body(field).isEmail().withMessage(field + ' must be a valid email format')
    }

    /**
     * Checks iif the phone format is correct.
     * Depending on the coutry, phone format can be changed
     * @param field field to check
     */
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

    /**
     * Checks if the field is a valid json array
     * @param field field to check
     */
    static isArray(field) {
        return body(field).isArray().withMessage(field + ' must be an array')
    }

    /**
     * Checks if the field is IN the array of values
     * @param field field to check
     * @param values array of values
     */
    static isIn(field, values) {
        return body(field).optional().isIn(values).withMessage(field + ' must be either ' + values.toString())
    }

    /**
     * Checks if the field is a number
     * @param field field to check
     */
    static isNumber(field) {
        return body(field).isInt().withMessage(field + ' must be a number')
    }

    /**
     * Checks the minimum length of the field
     * @param field field to check
     * @param length length for checking
     */
    static minLength(field, length) {
        return body(field).isLength({ min: length }).withMessage(field + ' must be at minimum length of ' + length )
    }

    /**
     * Checks the maximum length of the field
     * @param field field to check
     * @param length length for checking
     */
    static maxLength(field, length) {
        return body(field).isLength({ max: length }).withMessage(field + ' must be at maximum length of ' + length )
    }

    /**
     * Validates and returns the proper status code of 422 back to the API client
     * @param req Express Request
     * @param res Express Response
     * @param next Express Next
     */
    static validate = (req, res, next) => {
        const errors = validationResult(req)
        if (errors.isEmpty()) {
            return next()
        }
        return res.status(422).json({ message: errors.array()[0].msg })
    }
}

