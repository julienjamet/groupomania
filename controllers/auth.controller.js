/*Calls--------------------------------------------------------------------------------------------------------------*/
const UserModel = require('../models/user.model') /*Calls the User schema*/
const bcrypt = require('bcrypt') /*Calls Bcrypt*/
const jwt = require('jsonwebtoken') /*Calls JsonWebToken*/
const errorHandling = require('../utils/errors.utils') /*Calls the error handling file*/
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation----------------------------------------------------------------------------------------------------------*/
/*------------POST(SignUp)*/
exports.signUp = (req, res) => { /*Exports to the User router a signUp() function...*/
    if (req.body.pseudo == '' || req.body.email == '' || req.body.password == '') {
        return res.status(400).json({ message: "Le formulaire est incomplet !" })
    }

    if (/^([A-Z])([a-zéèç0-9]+).{1,}(-[A-Z][a-zéèêïç]+)?$/.test(req.body.pseudo) && /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(req.body.email) && /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(req.body.password)) { /*...that uses a Regex to check if the pseudo and email have a valid form and if the password is strong enough...*/
        bcrypt.hash(req.body.password, 10) /*...then runs the Bcrypt hash() function to hash the password...*/
            .then(hash => {
                const user = new UserModel({ /*...before creating from the User schema a User object...*/
                    pseudo: req.body.pseudo,
                    email: req.body.email,
                    password: hash /*...whose password will be the result of the Bcrypt hash() function...*/
                })
                user.save() /*...and finally saves this new User object on the database*/
                    .then(() => res.status(201).json({ message: `Bienvenue ${req.body.pseudo} ! Votre compte a été créé !` }))
                    .catch((error) => {
                        const errors = errorHandling(error)
                        res.status(400).json({ errors })
                    })

            })
            .catch(error => res.status(500).json({ error }))
    }
    else {
        if (!/^([A-Z])([a-zéèç0-9]+).{1,}(-[A-Z][a-zéèêïç]+)?$/.test(req.body.pseudo)) {
            return res.status(400).json({ message: "Veuillez entrer un pseudo d'au moins 3 caractères commençant par une lettre majuscule" })
        }
        if (!/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(req.body.email)) {
            return res.status(400).json({ message: "Veuillez entrer une adresse email valide" })
        }
        if (!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(req.body.password)) {
            return res.status(400).json({ message: "Veuillez entrer un mot de passe d'au moins 8 caractères comprenant au moins une majuscule, une minuscule, un chiffre et un caractère spécial" })
        }
    }
}

/*------------POST(SignIn)*/
exports.signIn = (req, res) => { /*Exports to the User router a signIn() function...*/
    if (req.body.email == '' || req.body.password == '') {
        return res.status(400).json({ message: "Le formulaire est incomplet !" })
    }

    UserModel.findOne({ email: req.body.email }) /*...that searches the database and selects the User object corresponding to the email address...*/
        .then(user => {
            bcrypt.compare(req.body.password, user.password) /*...then runs the Bcrypt compare() function to compare the entered password with the known database password*/
                .then(valid => {
                    if (!valid) { /*If the password is invalid...*/
                        return res.status(401).json({ message: 'Le mot de passe est incorrect !' }); /*...the function returns an error message*/
                    }
                    else {
                        const token = { /*Otherwise, it creates a Token object...*/
                            userId: user._id, /*...containing the user identifier...*/
                            token: jwt.sign( /*...and an authentication token randomly created by JsonWebToken...*/
                                { userId: user._id },
                                'RANDOM_TOKEN_SECRET',
                                { expiresIn: '120h' }
                            )
                        }
                        res.cookie('token', token, { httpOnly: true }) /*...before returning it as a cookie*/
                        res.status(200).json({ message: `Bonjour ${user.pseudo} ! Vous êtes maintenant connecté(e) à votre session !` })
                    }
                })
                .catch(error => res.status(500).json({ error }))
        })
        .catch(() => res.status(404).json({ message: `Il n'existe aucun compte associé à l'adresse email '${req.body.email}' !` }))
}

/*------------GET(LogOut)*/
exports.logOut = (req, res) => { /*Exports to the User router a logOut() function...*/
    res.cookie('token', '', { maxAge: 1 }) /*...that gives the user a new token that expires after 1 millisecond...*/
    res.redirect('/profile') /*...then redirects the user to the login/register page*/
    console.log("Vous êtes maintenant déconnecté(e) de votre session, à bientôt !")
}
/*-------------------------------------------------------------------------------------------------------------------*/