import {_} from 'lodash';
import {Log} from '../libraries/Helpers';

/**
 * Parses and returns error based on the Error Code
 */
export class ErrorHandlerController {

    /**
     * Error codes and message for fields with Unique attributes
     * @param err
     * @private
     */
    private static getUniqueErrorMessage (err: any) {
        let output = '';

        try {
            for (const [key, value] of Object.entries(err.keyValue)) {
                output += value + ' must be unique in ' + key;
            }

        } catch (ex) {
            output = 'Unique field already exists';
        }

        return output;
    };

    /**
     * Error Message based on the code
     * @param err
     */
    public static getErrorMessage(err: any) {
        let message = '';
        Log(err)
        if (!err.code) {
            message = err.message || 'Something went wrong (12)';
        }
        if (err.code) {
            switch (err.code) {
                case 11000:
                    message = this.getUniqueErrorMessage(err);
                    break;
                case 11001:
                    message = this.getUniqueErrorMessage(err);
                    break;
                case 10000:
                    message = err.message;
                    break;
                default:
                    message = 'Something went wrong';
            }
        } else {
            for (const errName in err.errors) {
                if (err.errors[errName].message) {
                    message = _.startCase(err.errors[errName].message.replace('Path ',''));
                }
            }
        }

        return message;
    };



}

