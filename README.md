# smartcar-api
Smartcar API Project. Node v6.2.2

# Install
```js
git clone https://github.com/calebhskim/smartcar-api.git
cd smartcar-api
npm install
```

# Usage
To start the API locally
```js
npm run start
```

To run the tests
```js
npm test
```

# Project Structure
```js
.
├── coverage
├── src
│   ├── config
│   ├── middleware
│   ├── routes
│   │   └── vehicles
│   └── utils
├── test
│   ├── component
│   └── routes
│       └── vehicles
└── views
    └── partials

```

# Overview
For this project I decided to build my server using [express](http://expressjs.com/) and make requests using [axios](https://github.com/mzabriskie/axios).
I chose to use axios because it is a promise based HTTP client. Testing is done using [mocha](https://mochajs.org/), [chai](http://chaijs.com/), [proxyquire](https://github.com/thlorenz/proxyquire), and [sinon](http://sinonjs.org/). The project is transpiled using [babel](https://babeljs.io/) and linting is done with [eslint](http://eslint.org/). I am using [airbnb's style guide](https://github.com/airbnb/javascript). View templates are built using [handlebars](http://handlebarsjs.com/).
# Routes
```js
- GET /vehicles/:id
- GET /vehicles/:id/doors
- GET /vehicles/:id/fuel
- GET /vehicles/:id/battery
- POST /vehicles/:id/engine
  Headers: Content-Type: application/json
  Body:
  {
    "action": "START|STOP"
  }
```
# Request Lifecycle
```
Client -> Express -> SmartCarApi.js -> GMApi.js
```
# Notes
All javascript in `src` is transpiled into a directory called `lib` when `npm test` or `npm start` is run. You can optionally run
`npm run build` to build `src`. When running `npm test` all coverage information can be found in the `coverage` directory. Occasionally
when running `npm test` sometimes a couple of the end-to-end tests will timeout. Running the tests again should allow all the tests to pass. 
