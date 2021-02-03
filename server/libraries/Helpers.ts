import * as _ from 'lodash';

export const padString = (s, length = 2) => {
    while (s.toString().length < length) {
        s = '0' + s;
    }
    return s;
};



export const PickFields = (ob, fields) => {
    return _.map(ob, o => _.pick(o, fields))
}

export const Log = (...message) => {
    if (process.env.NODE_ENV === 'testing' || process.env.HIDE_LOGS === 'true') {
        return () => {
        }
    } else {
        return console.log(...message)
    }
} //

export const UniqueId = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
};

interface NgTime {
    hour: number;
    minute: number;
    second: number;
}

export const MergeDateTime = (date: Date, time: NgTime): Date => {
    const d = new Date(date);
    return new Date(d.getFullYear(), d.getMonth(), d.getDate(), time.hour, time.minute, time.second)
}

export const Round = (num)=> {
    return Math.round((num + Number.EPSILON) * 100) / 100
}

export const ReturnReject = (message) : Promise<any>  => {
    return new Promise((resolve, reject) => {
        reject(message)
    })
}

export const ReturnResolve = (message) : Promise<any> => {
    return new Promise((resolve, reject) => {
        resolve(message)
    })
}
