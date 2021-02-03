/**
 * Config loading based on the ENV of the server
 */
const env = process.env.NODE_ENV || 'development';
const configFile = '../config/'+env+'/config';
export const config =  require(configFile);
