/*Calls--------------------------------------------------------------------------------------------------------------*/
const PostModel = require('../models/post.model') /*Calls the Post schema*/
const UserModel = require('../models/user.model') /*Calls the User schema*/
const ObjectId = require('mongoose').Types.ObjectId /*Calls the Mongoose ObjectId feature*/
const fs = require('fs') /*Calls FS*/
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation----------------------------------------------------------------------------------------------------------*/
/*------------POST*/
module.exports.createPost = (req, res) => { /*Exports to the Post router a createPost() function*/
    if (req.body.posterId != res.locals.user._id) { /*If the user impersonates someone else...*/
        return res.status(401).json({ message: "Vous ne pouvez pas créer un post à la place de quelqu'un d'autre !" }) /*...the function returns an error message*/
    }

    const newPost = new PostModel(req.file ? { /*Otherwise it creates a Post object...*/
        posterId: req.body.posterId,
        posterPseudo: res.locals.user.pseudo,
        message: req.body.message,
        picture: `https://julienjamet-groupomania.com/frontend/public/uploads/profil/${req.file.filename}`,
        likers: [],
        comments: []
    } : {
        posterId: req.body.posterId,
        posterPseudo: res.locals.user.pseudo,
        message: req.body.message,
        likers: [],
        comments: []
    })

    newPost.save() /*...and saves it on the database*/
        .then(() => res.status(201).json({ message: "Votre post a été créé !" }))
        .catch(error => res.status(400).json(error))
}

/*------------GET*/
module.exports.readPost = (req, res) => { /*Exports to the Post router a readPost() function...*/
    PostModel.find().sort({ createdAt: -1 }) /*...that searches the database and selects all Post objects...*/
        .then(posts => res.status(200).json(posts)) /*...before returning them to the frontend, sorted from newest to oldest*/
        .catch(error => res.status(404).json({ error }))
}

/*------------UPDATE*/
module.exports.updatePost = (req, res) => { /*Exports to the Post router a updatePost() function...*/
    if (!ObjectId.isValid(req.params.id)) { /*...that runs the ObjectId isValid() function to check that the identifier of the post is indeed present in the database. If it is not...*/
        return res.status(404).json({ message: `Ce post n'existe pas !` }) /*...the function returns an error message*/
    }

    PostModel.findOne({ _id: req.params.id }) /*Otherwise, it searches the database and selects the Post object corresponding to the identifier passed as a parameter*/
        .then((post) => {
            if (post.posterId != res.locals.user._id && res.locals.user._id != `${process.env.ADMIN_ID}`) { /*If the modifiying user is different from the modified post creator...*/
                return res.status(401).json({ message: "Vous ne pouvez pas modifier le post de quelqu'un d'autre !" }) /*...the function returns an error message*/
            }

            const postUpdate = { /*Otherwise it creates a new Post object...*/
                message: req.body.message
            }

            PostModel.updateOne({ _id: req.params.id }, { ...postUpdate, _id: req.params.id }) /*...then updates the former Post object with the new information*/
                .then(() => res.status(200).json({ message: 'La modification a été effectuée !' }))
                .catch(error => {
                    const errors = errorHandling(error)
                    res.status(400).json({ errors })
                })
        })
        .catch(error => res.status(404).json({ error }))
}

/*------------DELETE*/
module.exports.deletePost = (req, res) => { /*Exports to the Post router a deletePost() function...*/
    if (!ObjectId.isValid(req.params.id)) { /*...that runs the ObjectId isValid() function to check that the identifier of the post is indeed present in the database. If it is not...*/
        return res.status(404).json({ message: `Ce post n'existe pas !` }) /*...the function returns an error message*/
    }

    PostModel.findOne({ _id: req.params.id }) /*Otherwise, it searches the database and selects the Post object corresponding to the identifier passed as a parameter*/
        .then((post) => {
            if (post.posterId != res.locals.user._id && res.locals.user._id != `${process.env.ADMIN_ID}`) { /*If the modifiying user is different from the modified post creator...*/
                return res.status(401).json({ message: "Vous ne pouvez pas supprimer le post de quelqu'un d'autre !" }) /*...the function returns an error message*/
            }

            const filename = post.picture?.split('/profil/')[1] /*Otherwise it targets in the "images" folder any image associated with this post...*/

            if (filename) {
                fs.unlink(`https://julienjamet-groupomania.com/frontend/public/uploads/profil/${filename}`, () => { /*...then runs the FS unlink() function to delete this image from the folder...*/
                    PostModel.deleteOne({ _id: req.params.id }) /*...before deleting the Post object itself*/
                        .then(() => res.status(200).json({ message: `Le post a été supprimé !` }))
                        .catch(error => res.status(500).json({ error }))
                })
            }
            else {
                PostModel.deleteOne({ _id: req.params.id }) /*...before deleting the Post object itself*/
                    .then(() => res.status(200).json({ message: `Le post a été supprimé !` }))
                    .catch(error => res.status(500).json({ error }))
            }
        })
        .catch(error => res.status(404).json({ error }))
}

/*------------PATCH (Like)*/
module.exports.likePost = (req, res) => { /*Exports to the Post router a likePost() function...*/
    if (!ObjectId.isValid(req.params.id)) { /*...that runs the ObjectId isValid() function to check that the identifier of the post is indeed present in the database. If it is not...*/
        return res.status(404).json({ message: `Ce post n'existe pas !` }) /*...the function returns an error message*/
    }

    if (req.body.id != res.locals.user._id) { /*If the user impersonates someone else...*/
        return res.status(401).json({ message: "Vous ne pouvez pas liker un post à la place de quelqu'un d'autre !" }) /*...the function also returns an error message*/
    }

    PostModel.findOne({ _id: req.params.id }) /*Otherwise, it searches the database and selects the Post object corresponding to the identifier passed as a parameter...*/
        .then(post => {
            const likers = post.likers.find(id => id == res.locals.user._id) /*...then finds if the user is already liking the post*/
            if (likers != undefined) { /*In this case...*/
                return res.status(400).json({ message: `Vous aviez déjà liké ce post !` }) /*...the function returns an error message*/
            }

            PostModel.updateOne({ _id: req.params.id }, { $push: { likers: res.locals.user._id } }) /*Otherwise it adds the user to the post's likers list...*/
                .then(() => {
                    UserModel.updateOne({ _id: req.body.id }, { $push: { likes: req.params.id } }) /*...and the post to the user's likes list*/
                        .then(() => res.status(200).json({ message: `Vous avez liké ce post !` }))
                        .catch(() => res.status(404).json({ message: `Ce post n'existe pas !` }))
                })
                .catch(() => res.status(404).json({ message: `Ce post n'existe pas !` }))
        })
        .catch(() => res.status(404).json({ message: `Ce post n'existe pas !` }))
}

/*------------PATCH (Unlike)*/
module.exports.unlikePost = (req, res) => { /*Exports to the Post router an unlikePost() function...*/
    if (!ObjectId.isValid(req.params.id)) { /*...that runs the ObjectId isValid() function to check that the identifier of the post is indeed present in the database. If it is not...*/
        return res.status(404).json({ message: `Ce post n'existe pas !` }) /*...the function returns an error message*/
    }

    if (req.body.id != res.locals.user._id) { /*If the user impersonates someone else...*/
        return res.status(401).json({ message: "Vous ne pouvez pas arrêter de liker un post à la place de quelqu'un d'autre !" }) /*...the function also returns an error message*/
    }

    PostModel.findOne({ _id: req.params.id }) /*Otherwise, it searches the database and selects the Post object corresponding to the identifier passed as a parameter...*/
        .then(post => {
            const likers = post.likers.find(id => id == res.locals.user._id) /*...then finds if the user is indeed liking the post*/
            if (likers == undefined) { /*If it is not the case...*/
                return res.status(400).json({ message: `Vous ne likiez pas ce post !` }) /*...the function returns an error message*/
            }

            PostModel.updateOne({ _id: req.params.id }, { $pull: { likers: res.locals.user._id } }) /*Otherwise it removes the user from the post's likers list...*/
                .then(() => {
                    UserModel.updateOne({ _id: req.body.id }, { $pull: { likes: req.params.id } }) /*...and the post from the user's likes list*/
                        .then(() => res.status(200).json({ message: `Vous avez arrêté de liker ce post !` }))
                        .catch(() => res.status(404).json({ message: `Ce post n'existe pas !` }))
                })
                .catch(() => res.status(404).json({ message: `Ce post n'existe pas !` }))
        })
        .catch(() => res.status(404).json({ message: `Ce post n'existe pas !` }))
}

/*------------PATCH (Add comment post)*/
module.exports.commentPost = (req, res) => { /*Exports to the Post router a commentPost() function...*/
    if (!ObjectId.isValid(req.params.id)) { /*...that runs the ObjectId isValid() function to check that the identifier of the post is indeed present in the database. If it is not...*/
        return res.status(404).json({ message: `Ce post n'existe pas !` }) /*...the function returns an error message*/
    }

    if (req.body.commenterId != res.locals.user._id) { /*If the user impersonates someone else...*/
        return res.status(401).json({ message: "Vous ne pouvez pas commenter un post à la place de quelqu'un d'autre !" }) /*...the function also returns an error message*/
    }

    PostModel.findOne({ _id: req.params.id }) /*Otherwise, it searches the database and selects the Post object corresponding to the identifier passed as a parameter...*/
        .then(() => {
            PostModel.updateOne({ _id: req.params.id }, { /*...then updates this Post object by adding a comment to it*/
                $push: {
                    comments: {
                        commenterId: req.body.commenterId,
                        commenterPseudo: res.locals.user.pseudo,
                        text: req.body.text,
                        timestamp: new Date().getTime()
                    }
                }
            })
                .then(() => res.status(200).json({ message: `Vous avez commenté ce post !` }))
                .catch(() => res.status(404).json({ message: `Ce post n'existe pas !` }))
        })
        .catch(() => res.status(404).json({ message: `Ce post n'existe pas !` }))
}

/*------------PATCH (Edit comment post)*/
module.exports.editCommentPost = (req, res) => { /*Exports to the Post router an editCommentPost() function...*/
    if (!ObjectId.isValid(req.params.id)) { /*...that runs the ObjectId isValid() function to check that the identifier of the post is indeed present in the database. If it is not...*/
        return res.status(404).json({ message: `Ce post n'existe pas !` }) /*...the function returns an error message*/
    }

    if (req.body.commenterId != res.locals.user._id && res.locals.user._id != `${process.env.ADMIN_ID}`) { /*If the user impersonates someone else...*/
        return res.status(401).json({ message: "Vous ne pouvez pas modifier un commentaire à la place de quelqu'un d'autre !" }) /*...the function also returns an error message*/
    }

    PostModel.findOne({ _id: req.params.id }) /*Otherwise, it searches the database and selects the Post object corresponding to the identifier passed as a parameter...*/
        .then(post => {
            const commentToEdit = post.comments.find(comment => comment._id.equals(req.body.commentId)) /*...then tries to find inside this Post object the comment corresponding to the "commentId" field of the request*/
            if (commentToEdit == undefined) { /*If the function does not find this comment...*/
                return res.status(404).json({ message: "Ce commentaire n'existe pas !" }) /*...it returns an error message*/
            }
            if (commentToEdit.commenterId != res.locals.user._id && res.locals.user._id != `${process.env.ADMIN_ID}`) { /*If the modifiying user is different from the user who created the comment...*/
                return res.status(404).json({ message: "Vous ne pouvez pas modifier un commentaire qui n'est pas le vôtre !" }) /*...it also returns an error message*/
            }

            else { /*Otherwise it updates the comment by modifying its content...*/
                commentToEdit.text = req.body.text
                post.save() /*...then saves it on the database*/
                return res.status(200).json({ message: "Vous avez modifié votre commentaire !" })
            }
        })
        .catch(error => res.status(404).json({ error }))
}

/*------------DELETE (Delete comment post)*/
module.exports.deleteCommentPost = (req, res) => { /*Exports to the Post router an deleteCommentPost() function...*/
    if (!ObjectId.isValid(req.params.id)) { /*...that runs the ObjectId isValid() function to check that the identifier of the post is indeed present in the database. If it is not...*/
        return res.status(404).json({ message: `Ce post n'existe pas !` }) /*...the function returns an error message*/
    }

    if (req.body.commenterId != res.locals.user._id && res.locals.user._id != `${process.env.ADMIN_ID}`) { /*If the user impersonates someone else...*/
        return res.status(401).json({ message: "Vous ne pouvez pas supprimer un commentaire à la place de quelqu'un d'autre !" }) /*...the function also returns an error message*/
    }

    PostModel.findOne({ _id: req.params.id }) /*Otherwise, it searches the database and selects the Post object corresponding to the identifier passed as a parameter...*/
        .then(post => {
            const commentToEdit = post.comments.find(comment => comment._id.equals(req.body.commentId)) /*...then tries to find inside this Post object the comment corresponding to the "commentId" field of the request*/
            if (commentToEdit == undefined) { /*If the function does not find this comment...*/
                return res.status(404).json({ message: "Ce commentaire n'existe pas !" }) /*...it returns an error message*/
            }
            if (commentToEdit.commenterId != res.locals.user._id && res.locals.user._id != `${process.env.ADMIN_ID}`) { /*If the deleting user is different from the user who created the comment...*/
                return res.status(404).json({ message: "Vous ne pouvez pas supprimer un commentaire qui n'est pas le vôtre !" }) /*...it also returns an error message*/
            }

            else { /*Otherwise it deletes the comment*/
                res.status(200).json({ message: "Vous avez supprimé votre commentaire !" })
                return PostModel.updateOne({ _id: req.params.id }, { $pull: { comments: { _id: req.body.commentId } } })
            }
        })
        .catch(error => res.status(404).json({ error }))
}
/*-------------------------------------------------------------------------------------------------------------------*/