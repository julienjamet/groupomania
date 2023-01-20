/*Calls--------------------------------------------------------------------------------------------------------------*/
/*------------Configuration*/
require('dotenv').config({ path: './config/.env' }) /*Calls DotEnv then sets the path to the environment variable*/
require('./config/db') /*Calls the MongoDB configuration file*/

/*------------App*/
const http = require('http') /*Calls the HTTP protocol*/
const app = require('./app') /*Calls the app*/
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation----------------------------------------------------------------------------------------------------------*/
const server = http.createServer(app); /*Creates an HTTP server that runs the app*/

server.listen(5000, () => { /*Sets the listening port of the server*/
    console.log(`Listening on port 5000`)
})
/*-------------------------------------------------------------------------------------------------------------------*/