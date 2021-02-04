import {IndexController} from '../controllers';

/**
 * Home or Index Route
 */
export class IndexRoutes {

  public indexController: IndexController = new IndexController()

  /**
   * We will jsut send a 404 for any index get request
   */
  public routes(app): void {
    app.route('/').get(this.indexController.home.bind(this.indexController))

  }

}
