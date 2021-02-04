import * as express from 'express';
import * as helmet from 'helmet';
import * as bodyParser from 'body-parser';
import {IndexRoutes} from './routes';
import * as path from 'path';
import {PersonRoute} from './routes/person.route';

/**
 * All Express setups and configurations
 * If you need to add a middleware, just add it here
 */
class App {

  public app: express.Application = express();

  // routes
  public indexRoutes: IndexRoutes = new IndexRoutes();
  public personRoute: PersonRoute = new PersonRoute();

  setupRoutes(){
    this.indexRoutes.routes(this.app);
    this.personRoute.routes(this.app);
  }

  constructor() {
    this.config();
    this.setupRoutes();
  }

  private config(): void{
    this.app.use(helmet())
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(express.static(path.join(__dirname, 'public')));

    this.app.set('trust proxy', 1) // trust first proxy
    this.app.use(express.static('public'));
  }


}

export default new App().app;
