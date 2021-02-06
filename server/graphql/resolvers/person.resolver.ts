import {MySQL} from '../../libraries/MySQL';

/**
 * Peron Resolver
 */
const table = 'tbl_persons'
export const PersonResolver = {
    Query: {
        persons: (root,{page}) => MySQL.paginate(table,'email', page),
        person: (root,{id}) => MySQL.findOne(table, {id})
    },

    Mutation: {
        createPerson : (root,{person}) => MySQL.create(table, person),
        updatePerson : (root,{person,id}) => MySQL.update(table, person,{id}),
        deletePerson : (root,{id}) => MySQL.delete(table, {id})
    }
}
