/*Calls--------------------------------------------------------------------------------------------------------------*/
const UserModel = require('../models/user.model') /*Calls the User schema*/
const jwt = require('jsonwebtoken') /*Calls JsonWebToken*/
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation----------------------------------------------------------------------------------------------------------*/
module.exports = (req, res, next) => { /*Exports a function...*/
    const token = req.cookies.token /*...that checks if there is an authentication token*/

    if (token != undefined) { /*If there is one...*/
        const decodedToken = jwt.verify(token.token, 'RANDOM_TOKEN_SECRET') /*...the function decodes it with the JsonWebToken verify() function...*/
        const userId = decodedToken.userId /*...to extract the user's identifier...*/

        UserModel.findOne({ _id: userId }) /*...then checks that this identifier is indeed present in the database. In this case...*/
            .then(user => { /*...the user is allowed to make any request*/
                res.locals.user = user
                next()
            })
            .catch(() => { /*Otherwise it means that the auth token is not valid, so the user is blocked and its unvalid token is removed*/
                res.locals.user = null
                res.cookie('token', '', { maxAge: 1 })
                return res.status(401).json({ message: "Votre jeton d'authentification n'est pas valide !" })
            })
    }
    else { /*If there is no token at all, the user is also blocked*/
        res.locals.user = null
        return res.status(401).json({ message: "Vous n'êtes pas authentifié(e) !" })
    }
}
/*-------------------------------------------------------------------------------------------------------------------*/