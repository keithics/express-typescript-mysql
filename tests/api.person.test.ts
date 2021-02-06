process.env.NODE_ENV = `testing`;
import {Request} from './Request';


describe('Running REST API Persons test.. ', () => {

  beforeEach(() => {
      // run database seed
  });

  it('/POST /person, it should create a person', done => {
    Request
        .post('/person')
        .send({
          name:'name',
          surname:'surname',
          email: 'email1@domain.com'
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
  });

  it('/GET /persons/page/1 responds with json and return status 200', done => {
    Request
        .get('/persons/page/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
  });

  it('/GET /person/2 it should get 1 item with status 200', done => {
    Request
        .get('/persons/page/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
  });

  it('/GET person/contacts/4 it should get person\'s contacts item with status 200', done => {
    Request
        .get('/person/contacts/4')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
  });

  it('/PUT /person, it should update a person', done => {
    Request
        .put('/person')
        .send({
          id: 1,
          name:'name1',
          surname:'surname1',
          email: 'email1@domain.com'
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
  });

  it('/DELETE /person/1, it should remove a person', done => {
    Request
        .delete('/person/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
  });


});
