/*Calls--------------------------------------------------------------------------------------------------------------*/
const mongoose = require('mongoose') /*Calls Mongoose*/
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation----------------------------------------------------------------------------------------------------------*/
const postSchema = new mongoose.Schema( /*Runs the Mongoose schema() function to create a Post schema*/
    {
        posterId: {
            type: String,
            required: true
        },
        posterPseudo: {
            type: String
        },
        message: {
            type: String,
            trim: true,
            maxlength: 500
        },
        picture: {
            type: String,
        },
        likers: {
            type: [String],
            required: true
        },
        comments: {
            type: [
                {
                    commenterId: String,
                    commenterPseudo: String,
                    text: String,
                    timestamp: Number
                }
            ],
            required: true
        }
    },
    {
        timestamps: true
    }
)
/*-------------------------------------------------------------------------------------------------------------------*/


/*Export-------------------------------------------------------------------------------------------------------------*/
module.exports = mongoose.model('post', postSchema) /*Exports the Post schema to the Post controller*/
/*-------------------------------------------------------------------------------------------------------------------*/