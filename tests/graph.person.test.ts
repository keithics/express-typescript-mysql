process.env.NODE_ENV = `testing`;
import {Request} from './Request';


describe('Running GRAPHQL Persons test.. ', () => {

  beforeEach(() => {
      // run database seed
  });

  it('Getting list of persons', done => {
    Request
        .post('/graphql')
        .send({
            query:`
            {
              persons(page: 1) {
                name
                gender
                birthday
              }
            }
            `
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
  });

  it('Getting ONE person', done => {
    Request
        .post('/graphql')
        .send({
            query:`
            {
              person(id: 11) {
                name
                gender
                birthday
              }
            }
            `
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
  });


  it('Create ONE person', done => {
    Request
        .post('/graphql')
        .send({
            query:`mutation{
  createPerson(person:{
    name: "keith11",
    surname: "lumanog",
    email: "com",
    birthday: "2007-12-03"
  }) {
    fieldCount
    affectedRows
    insertId
    info
    serverStatus
    warningStatus
  }
}
            `
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
  });


  it('Update ONE person', done => {
    Request
        .post('/graphql')
        .send({
            query:`mutation{
                updatePerson(person:{
                name: "keith",
                surname: "lumanog",
                email: "aa@aa.com"
              }, id: 3) {
                fieldCount
                affectedRows
                insertId
                info
                serverStatus
                warningStatus
              }
          }
            `
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
  });

  it('DELETE ONE person', done => {
    Request
        .post('/graphql')
        .send({
            query:`
            mutation{
              deletePerson(id:3) {
                fieldCount
                affectedRows
                insertId
                info
                serverStatus
                warningStatus
              }
            }
            `
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
  });


});
