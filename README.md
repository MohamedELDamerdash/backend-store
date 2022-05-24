 1) create .env file in the root directory and here is an example for the data you would put in it
  {
    host=0.0.0.0
    pg_db=store
    pg_user=postgres
    pg_port=5000
    pg_db_t=store_test
    pg_password=1
    ENV=dev
    PEPPERR=encryption_passwords
    salt_rounds=10
    secret_t= yourjwttokensecret
  } 


 2) create database
  CREATE DATABASE store;
  CREATE DATABASE store_test;

  3) database port :5432


 4)to install the node module folder
  npm init -y

 5)edit script to:
    "prestart": "npm run build",
    "dev": "nodemon src/server.ts --watch",
    "build": "npx tsc",
    "prettier": "prettier --config .prettierrc \"src/**/*.ts\" --write",
    "lint": "eslint src/**/*.ts",
    "lint:f": "eslint src/**/*.ts --fix",
    "start": "node build/server.js",
    "watch": "tsc-watch --esModuleInterop src/server.ts --outDir ./dist --onSuccess \"node ./dist/server.js\"",
    "test": " db-migrate --env test reset && tsc && set ENV=test&& db-migrate --env test up && jasmine ",
    "tsc": "tsc"


 6)install packages
  npm i bcrypt cors body-parser nodemon helmet dotenv morgan express  jsonwebtoken  pg  supertest  typescript

  npm i -D @types/bcrypt  @types/dotenv @types/cors @types/express @types/morgan @types/jasmine  @types/jsonwebtoken  @types/pg  @types/supertest  @typescript-eslint/eslint-plugin  @typescript-eslint/parser  db-migrate  db-migrate-pg  eslint  jasmine  jasmine-spec-reporter  jasmine-ts  prettier  ts-node  tsc-watch

 7) to build the project
  npm run build

 8) to run the migration
   db-migrate up

 9)to start the project
  npm run start  

((http://localhost:5000))

 10)to run tests
  npm run test

  11)to run nodemon
    npm run dev