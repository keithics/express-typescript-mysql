/**
 * Person Types
 */
import gql from 'graphql-tag';

export const PersonTypes = gql`
        scalar Date
        scalar EmailAddress
        enum Gender {
            male
            female
        }

        type Person{
            id: ID
            name: String!
            surname: String!
            age: Int
            gender: Gender
            birthday: Date
            phone: String
            email: EmailAddress
            create: Date
            modified: Date
        }

        type MySqlResponse {
            fieldCount: Int
            affectedRows: Int
            insertId: Int
            info: String
            serverStatus: Int
            warningStatus: Int
        }

        input PersonInput {
            name: String!
            surname: String!
            age: Int
            gender: Gender
            birthday: Date
            phone: String
            email: EmailAddress
            create: Date
            modified: Date
        }

        type Query {
            persons(page: Int!): [Person]
            person(id: ID!): Person
        }


        type Mutation {
            createPerson(person: PersonInput): MySqlResponse
            updatePerson(person: PersonInput,id:ID): MySqlResponse
            deletePerson(id: ID): MySqlResponse
        }
`
