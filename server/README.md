# Chat server

## Install Node / NPM
https://docs.npmjs.com/getting-started/installing-node

## Install TypeScript
https://www.npmjs.com/package/typescript


this can also be done by creating a `.env` file in the root of this project see `.env.example` for a reference


## Getting started
Clone the repository
Create `.env` file and put into it 
## Set the following ENV VARs for your DB Connections:
`export DB_USER=''  DB='' DB_PASS='' DB_HOST='' DB_PORT='' DB_MAX_CLIENTS='' DB_IDLE_TIMEOUT_MS=''`
see `.env.example` 

Run `npm install` to install the dependencies

Run `npm start` to debug locally

## Transpile TypeScript to the build folder
run `tsc`

you can adjust transpiling settings in tsconfig.json