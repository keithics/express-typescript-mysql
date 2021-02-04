import * as _ from 'lodash';

/**
 * Adds a 0 for numbers less than length parameter
 * @param s Number
 * @param length number of zeros infront
 */
export const padString = (s, length = 2) => {
    while (s.toString().length < length) {
        s = '0' + s;
    }
    return s;
};


/**
 * Maps and picks object properties
 * @param ob object
 * @param fields fields to pick
 */
export const PickFields = (ob, fields) => {
    return _.map(ob, o => _.pick(o, fields))
}

/**
 * Simple console.log wrapper, all console logs should be removed automatically when running npm run prod
 * @param message message object
 */
export const Log = (...message) => {
    if (process.env.NODE_ENV === 'testing' || process.env.HIDE_LOGS === 'true') {
        return () => {
        }
    } else {
        return console.log(...message)
    }
} //

/**
 * Creates a unique and random UIDs
 */
export const UniqueId = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
};

/**
 * Promise Rejects
 * @param message message to return when rejecting a promise
 */
export const ReturnReject = (message) : Promise<any>  => {
    return new Promise((resolve, reject) => {
        reject(message)
    })
}

/**
 * Promise Resolves
 * @param message message to return when resolving a promise
 */
export const ReturnResolve = (message) : Promise<any> => {
    return new Promise((resolve, reject) => {
        resolve(message)
    })
}
