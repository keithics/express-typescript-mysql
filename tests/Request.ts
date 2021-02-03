import app from '../server/app';

const request = require('supertest');

const hook = (method = 'post') => (args) =>
    request(app)
        [method](args)
        // .set('x-user-token', Global.token)

export const Request = {
    post: hook('post'),
    get: hook('get'),
    put: hook('put'),
    delete: hook('delete'),
};
