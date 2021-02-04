import {Request, Response} from 'express';
const _ = require('lodash');

/**
 * Home or Index Contrller
 */
export class IndexController{

    /**
     * Just return 404 since we are only doing a decoupled structure, no need for views
     * @param req Express Request
     * @param res Express Response
     */
    public home(req: Request, res: Response){
        res.sendStatus(404);
    }


}
