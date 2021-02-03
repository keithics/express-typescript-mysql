import {config} from '../config/config';
import {Log, ReturnReject} from '../libraries/Helpers';
import {GlobalPrefs} from './GlobalPrefs';
const mysql = require('mysql2');
const _ = require('lodash');

export const MySQL = {

    /**
     * Removes undefined values in the object
     * @param data object to be filtered
     */
    cleanUpdateData : (data) => {
        return _.pickBy(data, x => x === false || x)
    },

    /**
     * get the KEY of the where field
     * TODO for now it's only working with one where field
     * @param whereField where field object eg: {id:1}
     * @return will return the object KEY - id for example
     */
    getWhereKey : (whereField) => {
        return Object.keys(whereField)[0]
    },

    /**
     * get the VALUE of the where field
     * TODO for now it's only working with one where field
     * @param whereField where field object eg: {id:1}
     * * @return will return the object VALUE - 1 for example
     */
    getWhereValues : (whereField) => {
        return Object.values(whereField)[0]
    },

    /**
     * Queries to the database and then close the connection
     * TODO :: creation a connection pool instead
     * @param query Query statement
     * @param isSingle true if you want to return a single object, otherwise false
     * @param fieldsObject array of objeect values of fields for prepared statements
     */
    query : (query: string, isSingle: boolean = false,fieldsObject: any | null = {}) => {
        const fields = _.values(fieldsObject);
        const con = mysql.createConnection(config.MySQL_CON);
        return con.promise().execute(query,fields)
            .then( ([rows,f]) => {
                if(isSingle){
                    return rows !== undefined || rows.length === 0 ? rows[0] : undefined
                }else {
                    return rows !== undefined || rows.length > 0 ? rows : undefined
                }
            })
            .catch(err => {
                throw err;
            })
            .finally( a => {
                con.destroy()
            })
    },

    /**
     * Get one item from the table based on the where field and value
     * @param table Table name
     * @param whereField object of fields and values, data object keys must be the same with fields in the table
     */
    findOne : (table,whereField:any = {}) => {
        const whereKey = MySQL.getWhereKey(whereField);
        const whereValue = MySQL.getWhereValues(whereField);
        const where = `${whereKey}=?`; // MyId = ?
        const query = `SELECT * FROM ${table} WHERE ${where}`;
        return MySQL.query(query,true,[whereValue])
    },

    /**
     * Paginate table
     * TODO make sort and order by dynamic
     * @param table  Table name
     * @param page Current page
     */
    paginate: (table,orderBy,page) : Promise<any> => {
        const limit = [page * GlobalPrefs.pagination.limit]
        const offset = GlobalPrefs.pagination.limit
        const sort = 'ASC'
        return MySQL.query(`SELECT * FROM ${table} ORDER BY ${orderBy} ${sort} LIMIT ?,${offset}`, false, limit)
    },

    /**
     * Creates a record, created and modified is automatically today's date
     * @param table  Table name
     * @param data object of fields and values, data object keys must be the same with fields in the table
     */
    create: (table: string, data: any) : Promise<any> => {
        const now = new Date();
        const objectValues = {...data, created: now, modified: now};
        const fields = Object.keys(objectValues);
        const values = _.map(objectValues,v => v || null);
        const placeHolders = new Array(fields.length).fill('?');
        const query = `INSERT INTO ${table} (${fields}) VALUES (${placeHolders})`;
        Log(fields);
        Log(query);
        Log(values);
        return MySQL.query(query,false,values)
    },

    /**
     * Updates a record, modified is automatically today's date
     * @param table  Table name
     * @param data object of fields and values, data object keys must be the same with fields in the table*
     * @param whereField object that contains the field as key and field value as value
     */
    update: (table: string, data: any, whereField:any) : Promise<any> => {

        const whereKey = MySQL.getWhereKey(whereField);
        const whereValue = MySQL.getWhereValues(whereField);
        const now = new Date();
        const objectValues = {...MySQL.cleanUpdateData(data), modified: now};
        const fields = _.map(objectValues, (value,key) => `${key}=?`); // field1=?,field2=?
        const where = `${whereKey}=?`; // MyId = ?
        const values = _.map({...objectValues,whereValue},v => v || null); // array of values including where field
        const query = `UPDATE ${table}  SET ${fields} WHERE ${where}`;
        return MySQL.query(query,false,values)
    },

    /**
     * Deletes a record
     * @param table  Table name
     * @param whereField object that contains the field as key and field value as value
     */
    delete: (table: string, whereField:any) : Promise<any> => {
        const whereKey = MySQL.getWhereKey(whereField);
        const whereValue = MySQL.getWhereValues(whereField);
        const where = `${whereKey}=?`; // MyId = ?
        const query = `DELETE FROM ${table} WHERE ${where}`;
        return MySQL.query(query,false,[whereValue])
    },



}

