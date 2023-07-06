/*Calls--------------------------------------------------------------------------------------------------------------*/
const UserModel = require('../models/user.model') /*Calls the User schema*/
const ObjectId = require('mongoose').Types.ObjectId /*Calls the Mongoose ObjectId feature*/
const errorHandling = require('../utils/errors.utils') /*Calls the error handling file*/
const fs = require('fs') /*Calls FS*/
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation----------------------------------------------------------------------------------------------------------*/
/*------------GET (All)*/
exports.getAllUsers = (req, res) => { /*Exports to the User router a getAllUsers() function...*/
    UserModel.find().select('-password') /*...that searches the database and selects all User objects (omitting passwords)...*/
        .then(users => res.status(200).json(users)) /*...before returning them to the frontend*/
        .catch(error => res.status(404).json({ error }))
}

/*------------GET (One)*/
exports.userInfo = (req, res) => { /*Exports to the User router a userInfo() function...*/
    if (!ObjectId.isValid(req.params.id)) { /*...that runs the ObjectId isValid() function to check that the identifier is indeed present in the database. If it is not...*/
        return res.status(404).json({ message: `Ce compte n'existe pas !` }) /*...the function returns an error message*/
    }

    UserModel.findById(req.params.id).select('-password') /*Otherwise, it searches the database and selects the User object corresponding to the identifier passed as a parameter (omitting the password)...*/
        .then(user => res.status(200).json(user)) /*...before returning it to the frontend*/
        .catch(error => res.status(404).json({ error }))
}

/*------------UPDATE*/
exports.updateUser = (req, res) => { /*Exports to the User router a updateUser() function...*/
    if (!ObjectId.isValid(req.params.id)) { /*...that runs the ObjectId isValid() function to check that the identifier is indeed present in the database. If it is not...*/
        return res.status(404).json({ message: `Ce compte n'existe pas !` }) /*...the function returns an error message*/
    }

    UserModel.findOne({ _id: req.params.id }) /*Otherwise, it searches the database and selects the User object corresponding to the identifier passed as a parameter*/
        .then(user => {
            if (user.pseudo != res.locals.user.pseudo) { /*If the modifiying user is different from the modified user...*/
                return res.status(401).json({ message: 'Vous ne pouvez pas modifier un autre utilisateur que vous !' }) /*...the function returns an error message*/
            }

            const userObject = req.file ? {
                ...req.body,
                picture: `./uploads/profil/${req.file.filename}`,
                id: user._id,
                password: user.password,
                followers: user.followers,
                followings: user.followings,
                likes: user.likes
            } : {
                ...req.body,
                id: user._id,
                password: user.password,
                followers: user.followers,
                followings: user.followings,
                likes: user.likes
            }

            const filename = user.picture.split('/profil/')[1] /*Otherwise it targets in the "images" folder any image associated with this user...*/

            if (req.file !== undefined && filename !== "random-user.png") {
                fs.unlink(`https://julienjamet-groupomania.com/frontend/public/uploads/profil/${filename}`, () => {
                    UserModel.updateOne({ _id: req.params.id }, { ...userObject, _id: req.params.id }) /*...then updates the former User object with the new information*/
                        .then(() => res.status(200).json({ message: "La modification a été effectuée !" }))
                        .catch(error => {
                            const errors = errorHandling(error)
                            res.status(400).json({ errors })
                        })
                })
            }

            else if ((req.file !== undefined && filename === "random-user.png") || req.file === undefined) {
                UserModel.updateOne({ _id: req.params.id }, { ...userObject, _id: req.params.id }) /*...then updates the former User object with the new information*/
                    .then(() => res.status(200).json({ message: "La modification a été effectuée !" }))
                    .catch(error => {
                        const errors = errorHandling(error)
                        res.status(400).json({ errors })
                    })
            }
        })
        .catch(error => res.status(400).json({ error }))
}

/*------------DELETE*/
exports.deleteUser = (req, res) => { /*Exports to the User router a deleteUser() function...*/
    if (!ObjectId.isValid(req.params.id)) { /*...that runs the ObjectId isValid() function to check that the identifier is indeed present in the database. If it is not...*/
        return res.status(404).json({ message: `Ce compte n'existe pas !` }) /*...the function returns an error message*/
    }

    UserModel.findOne({ _id: req.params.id }) /*Otherwise, it searches the database and selects the User object corresponding to the identifier passed as a parameter...*/
        .then(user => {
            if (user.pseudo != res.locals.user.pseudo) { /*If the deleting user is different from the modified user...*/
                return res.status(401).json({ message: 'Vous ne pouvez pas supprimer un autre utilisateur que vous !' }) /*...the function also returns an error message*/
            }

            const filename = user.picture.split('/profil/')[1] /*Otherwise it targets in the "images" folder any image associated with this user...*/
            if (filename !== "random-user.png") {
                fs.unlink(`https://julienjamet-groupomania.com/frontend/public/uploads/profil/${filename}`, () => { /*...then runs the FS unlink() function to delete this image from the folder...*/
                    UserModel.deleteOne({ _id: req.params.id }) /*...before deleting the User object itself*/
                        .then(() => res.status(200).json({ message: `Le compte de ${user.pseudo} a été supprimé !` }))
                        .catch(error => res.status(500).json({ error }))
                })
            }
            else {
                UserModel.deleteOne({ _id: req.params.id }) /*...before deleting the User object itself*/
                    .then(() => res.status(200).json({ message: `Le compte de ${user.pseudo} a été supprimé !` }))
                    .catch(error => res.status(500).json({ error }))
            }
        })
        .catch(error => res.status(404).json({ error }))
}

/*------------PATCH (Follow)*/
exports.follow = (req, res) => { /*Exports to the User router a follow() function...*/
    if (!ObjectId.isValid(req.params.id) || !ObjectId.isValid(req.body.idToFollow)) { /*...that runs the ObjectId isValid() function to check that the identifiers are indeed present in the database. If at least one of them is not...*/
        return res.status(404).json({ message: `Ce compte n'existe pas !` }) /*...the function returns an error message*/
    }

    if (req.params.id == req.body.idToFollow) { /*If the user tries to follow itself...*/
        return res.status(400).json({ message: `Vous ne pouvez pas vous suivre vous-même !` }) /*...it also returns an error message*/
    }

    if (req.params.id != res.locals.user._id) { /*If the user impersonates someone else...*/
        return res.status(401).json({ message: "Vous ne pouvez pas suivre quelqu'un à la place de quelqu'un d'autre !" }) /*...it also returns an error message*/
    }

    UserModel.findOne({ _id: req.params.id }) /*Otherwise, it searches the database and selects the User object corresponding to the identifier passed as a parameter...*/
        .then((follower) => {
            const followings = follower.followings.find(id => id == req.body.idToFollow) /*...then finds if the follower is already following the followed user*/
            if (followings != undefined) { /*In this case...*/
                return res.status(400).json({ message: `Vous suivez déjà cette personne !` }) /*...the function returns an error message*/
            }

            UserModel.updateOne({ _id: req.params.id }, { $push: { followings: req.body.idToFollow } }) /*Otherwise it adds the followed user to the follower's subscriptions list...*/
                .then(() => {
                    UserModel.findOne({ _id: req.body.idToFollow })
                        .then((following) => {
                            UserModel.updateOne({ _id: req.body.idToFollow }, { $push: { followers: req.params.id } }) /*...and the follower to the followed user's followers list*/
                                .then(() => res.status(200).json({ message: `${follower.pseudo} suit ${following.pseudo} !` }))
                                .catch(() => res.status(404).json({ message: `Ce compte n'existe pas !` }))
                        })
                        .catch(() => res.status(404).json({ message: `Ce compte n'existe pas !` }))
                })
                .catch(() => res.status(404).json({ message: `Ce compte n'existe pas !` }))
        })
        .catch(() => res.status(404).json({ message: `Ce compte n'existe pas !` }))
}

/*------------PATCH (Unfollow)*/
exports.unfollow = (req, res) => { /*Exports to the User router an unfollow() function...*/
    if (!ObjectId.isValid(req.params.id) || !ObjectId.isValid(req.body.idToUnfollow)) { /*...that runs the ObjectId's isValid() function to check that the identifiers are indeed present in the database. If at least one of them is not...*/
        return res.status(404).json({ message: `Ce compte n'existe pas !` }) /*...the function returns an error message*/
    }

    if (req.params.id != res.locals.user._id) { /*If the user impersonates someone else...*/
        return res.status(401).json({ message: "Vous ne pouvez pas arrêter de suivre quelqu'un à la place de quelqu'un d'autre !" }) /*...the function also returns an error message*/
    }

    UserModel.findOne({ _id: req.params.id }) /*Otherwise, it searches the database and selects the User object corresponding to the identifier passed as a parameter...*/
        .then((follower) => {
            const followings = follower.followings.find(id => id == req.body.idToUnfollow) /*...then finds if the follower is already following the followed user*/
            if (followings == undefined) { /*If it is not the case...*/
                return res.status(400).json({ message: `Vous ne pouvez pas arrêter de suivre quelqu'un que vous ne suiviez pas !` }) /*...the function returns an error message*/
            }

            UserModel.updateOne({ _id: req.params.id }, { $pull: { followings: req.body.idToUnfollow } }) /*Otherwise it removes the followed user from the follower's subscriptions list...*/
                .then(() => {
                    UserModel.findOne({ _id: req.body.idToUnfollow })
                        .then((following) => {
                            UserModel.updateOne({ _id: req.body.idToUnfollow }, { $pull: { followers: req.params.id } }) /*...and the follower from the followed user's followers list*/
                                .then(() => res.status(200).json({ message: `${follower.pseudo} ne suit plus ${following.pseudo} !` }))
                                .catch(() => res.status(500).json({ message: `Ce compte n'existe pas !` }))
                        })
                        .catch(() => res.status(404).json({ message: `Ce compte n'existe pas !` }))
                })
                .catch(() => res.status(404).json({ message: `Ce compte n'existe pas !` }))
        })
        .catch(() => res.status(404).json({ message: `Ce compte n'existe pas !` }))
}
/*-------------------------------------------------------------------------------------------------------------------*/