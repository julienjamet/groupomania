/*Calls--------------------------------------------------------------------------------------------------------------*/
const multer = require('multer') /*Calls Multer*/
const MIME_TYPES = { /*Creates a MIME type dictionary that handles image formats*/
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
}
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation----------------------------------------------------------------------------------------------------------*/
const storage = multer.diskStorage({ /*Runs the Multer diskStorage() function to create an image file...*/
    destination: (req, file, callback) => {
        callback(null, '../frontend/public/uploads/profil') /*...then saves it to the "images" folder*/
    },
    filename: (req, file, callback) => { /*The function also handles the filename...*/
        const name = file.originalname.split(' ').join('_') /*...by replacing any spaces with underscores...*/
        const name2 = name.split('.')[0]

        const extension = MIME_TYPES[file.mimetype] /*... and converting formats with the MIME type dictionary*/
        callback(null, name2 + Date.now() + '.' + extension)
    }
})
/*-------------------------------------------------------------------------------------------------------------------*/


/*Export-------------------------------------------------------------------------------------------------------------*/
module.exports = multer({ storage }).single('image') /*Exports the Multer middleware and configures it to only target image files*/
/*-------------------------------------------------------------------------------------------------------------------*/