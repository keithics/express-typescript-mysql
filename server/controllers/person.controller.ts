import {Request, Response} from 'express';
import {MySQL} from '../libraries/MySQL';
const faker = require('faker')
import {Log} from '../libraries/Helpers';
import {ErrorResponse, SuccessResponse} from '../libraries/Responses';
import {MysqlSuccessInterface} from '../interfaces/mysql-success.interface';
import {ErrorInterface} from '../interfaces/error.interface';

/**
 * Crud for Persons table
 */
export class PersonController{

    /**
     * Database table
     */
    table = 'tbl_persons';


    /**
     * Get one of Person
     * @param req Express Request
     * @param res Express Response
     * @param req.page Current page
     * @return Person Object
     */
    async get(req: Request, res: Response): Promise<void | ErrorInterface | PersonInterface> {
        const id = +req.params.id || 0;
        MySQL.findOne(this.table, {id}).then(response => SuccessResponse(res, response))
             .catch(error => ErrorResponse(res, error));

    }

    /**
     * Get the list of Persons, to change the pagination, edit the global prefs file.
     * @param req Express Request
     * @param res Express Response
     * @param req.page Current page
     * @return list of persons and paginated
     */
    async list(req: Request, res: Response): Promise<void | ErrorInterface | PersonInterface[]> {
        const page = +req.params.page || 0;
        MySQL.paginate(this.table, page).then(response => SuccessResponse(res, response))
             .catch(error => ErrorResponse(res, error));

    }

    /**
     * Create a Person
     * @param req Express Request
     * @param res Express Response
     * @returns Promise Person success object
     */
    async create(req: Request, res: Response): Promise< void | ErrorInterface | MysqlSuccessInterface> {
        const {name,surname,age,gender,birthday,phone,email} = req.body;
        MySQL.create(this.table,{name,surname,age,gender,birthday,phone,email})
            .then(response => SuccessResponse(res, response))
            .catch(error => ErrorResponse(res, error));
    }

    /**
     * Update a Person
     * @param req Express Request
     * @param res Express Response
     * @returns Promise Person success object
     */
    async update(req: Request, res: Response): Promise< void | ErrorInterface | MysqlSuccessInterface> {
        const {name,surname,age,gender,birthday,phone,email} = req.body;
        const id = +req.body.id;
        MySQL.update(this.table,{name,surname,age,gender,birthday,phone,email},{id})
            .then(response => SuccessResponse(res, response))
            .catch(error => ErrorResponse(res, error));
    }

    /**
     * Deletes a Person
     * @param req Express Request
     * @param res Express Response
     * @returns Promise Person success object
     */
    async delete(req: Request, res: Response): Promise< void | ErrorInterface | MysqlSuccessInterface> {
        const id = +req.params.id;
        MySQL.delete(this.table,{id})
            .then(response => SuccessResponse(res, response))
            .catch(error => ErrorResponse(res, error));
    }

    /**
     * Seeds the database with random data
     * @param req Express Request
     * @param res Express Response
     */
    async seed(req: Request, res: Response): Promise<void> {
        const genders = ['male','female'];
        for(let i = 0; i <= 100; i++){
            const name = faker.name.firstName();
            const surname = faker.name.lastName();
            const age = faker.random.number();
            const gender = genders[Math.floor(Math.random() * genders.length)];;
            const birthday = new Date();
            const phone = faker.phone.phoneNumber();
            const email = faker.internet.email();

            MySQL.create(this.table,{name,surname,age,gender,birthday,phone,email}).then(()=>{
            }).catch(e => Log(e))
        }

        // We will not wait for the promise to resolve
        res.send({done:'ok'})

    }

}
