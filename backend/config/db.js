/*Calls--------------------------------------------------------------------------------------------------------------*/
const mongoose = require('mongoose') /*Calls Mongoose*/
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation----------------------------------------------------------------------------------------------------------*/
mongoose.connect(process.env.MONGODB_CREDENTIALS, { useNewUrlParser: true, useUnifiedTopology: true }) /*Connects the app to the MongoDB database*/
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.log('Failed to connect to MongoDB', error))
/*-------------------------------------------------------------------------------------------------------------------*/