# ExpressJS with MySQL in Typescript

### API
https://www.apimatic.io/apidocs/keithics-rest-api/v/1_0#/http/getting-started


| DESCRIPTION | METHOD | URL | POST JSON PARAMS |
| ------ | ------ |------ |------ |
| Persons list | GET | /persons/page/0-N | |
| Get One Person | GET | /persons/0-N | |
| Create Person | POST | /person | `{ "name":"aa","surname":"sur","email": "aa@asd.com","phone": "09989876543","gender": "male"}`
| Update Person | PUT | /person | `{ "id":1,"name":"aa1","surname":"sur1","email": "email1@gmail.com","phone": "09989876543","gender": "male"}`
| Delete Person | DELTE | /person/0-N | |
| Seed sample Persons | GET | /persons/seed | |

## Installation

Simply run
```bash
$ npm install 
```

or via Yarn.
```bash
$ yarn 
```
Edit the config file depends on your server environment
```javascript
module.exports = {
        MySQL_CON :{
        connectionLimit : 10,
        host: 'xx.xx.xx.xx',
        user: 'root',
        password: '',
        database: 'restapi',
        debug: false,
        Promise: require('bluebird')
        },
        PORT: 3307,
        HOST : 'localhost'
}

```

# Running in development
```bash
$ npm run dev
```

Type `rs` inside the terminal to manually restart the app.

more information [ts-node-dev](https://www.npmjs.com/package/ts-node-dev)

# Production

```bash
$ npm run build
```
This will build all files inside `dist` folder and run pm2 or via AWS Elastic Beanstalk.

# Linting

```bash
$ npm run lint
```

# Automated Tests
**_In order for this to work, you need to update your testing config json file._**

```bash
$ npm run test
```

If you want to test via Postman, import `Rest API.postman_collection.json` to Postman

#Testing Via cURL

#### Paginate Data
```bash
curl -X GET --url 'http://localhost:3000/persons/page/0'
````

#### Get Person with id = 2
```bash
curl -X GET --url 'http://localhost:3000/person/2'
````

#### Create Person
```bash
curl -X POST \
--url 'http://localhost:3000/person'  \
-H 'Content-type: application/json' \

--data-raw '{
"name": "aa",
"surname": "sur",
"email": "aa@asd.com",
"phone": "09989876543",
"gender": "male"
}'
````

#### Update Person
```bash
curl -X PUT \
--url 'http://localhost:3000/person'  \
-H 'Content-type: application/json' \

--data-raw '{
"id": 4,
"name": "aa5",
"surname": "sur1",
"email": "aa@asd1.com",
"phone": "09989876543"
}'
````

#### Delete
```bash
curl -X DELETE \
--url 'http://localhost:3000/person/1'  \
-H 'Content-type: application/json' \

--data-raw '{
"id": 1,
"name": "aa1",
"surname": "sur1",
"email": "aa@asd1.com",
"phone": "09989876543",
"gender": "female"
}'
````

# Code Documentation
Please check the documentation folder

 
# License

MIT License

Copyright (c) 2021 Keith Levi Lumanog

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.



[https://github.com/microsoft/TypeScript-Node-Starter]: https://github.com/microsoft/TypeScript-Node-Starter
