import {Validator} from '../libraries/Validator';

/**
 * Person validator middleware, we are going to check ID if we are updating the record
 * @param update true if we are updating the recordm, otherwise false
 */
export const PersonValidator = (update: boolean = false) => {
    const rules = [
        Validator.required('name'),
        Validator.required('surname'),
        Validator.required('email'),
        Validator.isEmail('email'),
        Validator.phone('phone'),
        Validator.isIn('gender',['male','female']),
    ];

    if(update) rules.push(Validator.isNumber('id'))

    return rules;
}

