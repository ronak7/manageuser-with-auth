# Project details

## Technologies
- Angular
- Node.js
- Express.js
- Mongodb

## mongoDB
Create collection with `test` name and import json from `DB` folder

## Installation
```bash
cd API
npm install

cd front
npm install
```

## Run Projects
```bash
cd API
npm start
or
node index.js

cd front
ng s
```
- `API` base URL is `http://localhost:3000/api`.
- `Front` base URL is `http://localhost:4200`

## .env file in API folder
- `PORT` is useed to start nodejs API on given post number.
- `DB_URL` is mongodb connection URL.
- `DB_NAME` a collection name in mongodb.
- `SECRETKEY` is for JWT token
```
PORT=3000
DB_URL="mongodb://localhost:27017"
DB_NAME="test"
SECRETKEY="test@12345"
```



