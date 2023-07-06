/*Calls--------------------------------------------------------------------------------------------------------------*/
/*------------Configuration*/
const helmet = require('helmet') /*Calls Helmet*/
const cookieParser = require('cookie-parser') /*Calls Cookie-parser*/

/*------------App*/
const express = require('express') /*Calls Express*/
const app = express() /*Creates an Express app*/

/*------------Middlewares*/
const auth = require('./middlewares/auth.middleware') /*Calls the Auth middleware*/

/*------------Routes*/
const userRoutes = require('./routes/user.routes') /*Calls the User router*/
const postRoutes = require('./routes/post.routes') /*Calls the Post router*/
/*-------------------------------------------------------------------------------------------------------------------*/


/*Configuration------------------------------------------------------------------------------------------------------*/
/*------------Parsing*/
app.use(express.json()) /*Runs the Express json() function to parse incoming requests*/
app.use(cookieParser()) /*Runs Cookie-Parser to parse cookies*/

/*------------Security*/
app.use(helmet({ crossOriginResourcePolicy: false })) /*Runs Helmet to protect the app from common attacks*/

app.use((req, res, next) => { /*Sets accesses to the app*/
    res.setHeader('Access-Control-Allow-Origin', `https://julienjamet-groupomania.com`)
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH')
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    next()
})
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation----------------------------------------------------------------------------------------------------------*/
app.get('/token', auth, (req, res) => { res.status(200).json(res.locals.user._id) }) /*Runs the Auth middleware on the "/token" route to automatically reconnect a user who has a still valid token*/
app.use('/api/user', userRoutes) /*Runs the User router on the "/api/user" route*/
app.use('/api/post', postRoutes) /*Runs the Post router on the "/api/post" route*/
/*-------------------------------------------------------------------------------------------------------------------*/


/*Export-------------------------------------------------------------------------------------------------------------*/
module.exports = app /*Exports the app to the server*/
/*-------------------------------------------------------------------------------------------------------------------*/