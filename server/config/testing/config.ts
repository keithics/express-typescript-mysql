/**
 * CONFIG is set to environment variables, this can be set in CircleCI or Jenkins
 */
module.exports = {
    MySQL_CON :{
        connectionLimit : process.env.MYSQL_POOL_LIMIT,
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        debug: process.env.MYSQL_DEBUG,
        Promise: require('bluebird')
    },
    PORT: process.env.MYSQL_PORT,
    HOST : 'localhost'
}
