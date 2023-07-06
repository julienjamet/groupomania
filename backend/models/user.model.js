/*Calls--------------------------------------------------------------------------------------------------------------*/
const mongoose = require('mongoose') /*Calls Mongoose*/
const uniqueValidator = require('mongoose-unique-validator') /*Calls the Mongoose Unique-validator plugin*/
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation----------------------------------------------------------------------------------------------------------*/
const userSchema = new mongoose.Schema( /*Runs the Mongoose schema() function to create a User schema*/
    {
        userId: {
            type: String,
        },
        pseudo: {
            type: String,
            required: true,
            unique: true,
            maxlength: 15,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            maxlength: 1024
        },
        picture: {
            type: String,
            default: `http://julienjamet-groupomania.onrender.com/images/random-user.png`
        },
        bio: {
            type: String,
            maxlength: 1024
        },
        followers: {
            type: [String]
        },
        followings: {
            type: [String]
        },
        likes: {
            type: [String]
        }
    },
    {
        timestamps: true
    }
)

userSchema.plugin(uniqueValidator) /*Runs the Mongoose Unique-validator plugin on the User schema to make sure that pseudos and email addresses cannot be replicated in the database*/
/*-------------------------------------------------------------------------------------------------------------------*/


/*Export-------------------------------------------------------------------------------------------------------------*/
module.exports = mongoose.model('user', userSchema) /*Exports the User schema to the Auth and User controllers*/
/*-------------------------------------------------------------------------------------------------------------------*/