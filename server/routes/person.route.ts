import {IndexController} from '../controllers';
import {PersonController} from '../controllers/person.controller';
import {PersonValidator} from '../validators/person.validator';
import {Validator} from '../libraries/Validator';

/**
 * Person Route
 */
export class PersonRoute {

    public personController: PersonController = new PersonController()

    public routes(app): void {
        /**
         * Seed Database Table
         */
        app.route('/persons/seed').get(this.personController.seed.bind(this.personController))

        /**
         * Get the list of Persons per page
         */
        app.route('/persons/page/:page').get(this.personController.list.bind(this.personController))

        /**
         * Get Person contacts
         */
        app.route('/person/contacts/:id').get(this.personController.contacts.bind(this.personController))

        /**
         * Get one Person based on the id
         */
        app.route('/person/:id').get(this.personController.get.bind(this.personController))

        /**
         * Create a Person
         */
        app.route('/person').post(
            PersonValidator(),Validator.validate,
            this.personController.create.bind(this.personController)
        )

        /**
         * Update a person based on the id
         */
        app.route('/person').put(
            PersonValidator(true),Validator.validate,
            this.personController.update.bind(this.personController)
        )

        /**
         * Delete a person based on the id
         */
        app.route('/person/:id').delete(this.personController.delete.bind(this.personController))

    }

}
