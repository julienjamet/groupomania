/*Calls--------------------------------------------------------------------------------------------------------------*/
/*------------Modules*/
const router = require('express').Router() /*Calls Express then creates an Express router*/

/*------------Middlewares*/
const auth = require('../middlewares/auth.middleware') /*Calls the Auth middleware*/
const multer = require('../middlewares/multer.middleware') /*Calls the Multer middleware*/

/*------------Controllers*/
const postController = require('../controllers/post.controller') /*Calls the Post controller*/
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation----------------------------------------------------------------------------------------------------------*/
/*------------Posts*/
router.get("/", auth, postController.readPost) /*Creates an authenticated GET route on '/' that runs the readPost() function of the Post controller*/
router.post("/", auth, multer, postController.createPost) /*Creates an authenticated POST route on '/' that runs the createPost() function of the Post controller*/
router.put("/:id", auth, multer, postController.updatePost) /*Creates an authenticated PUT route on '/:id' that runs the updatePost() function of the Post controller*/
router.delete("/:id", auth, postController.deletePost) /*Creates an authenticated DELETE route on '/:id' that runs the deletePost() function of the Post controller*/

/*------------Likes*/
router.patch("/like-post/:id", auth, postController.likePost) /*Creates an authenticated PATCH route on '/like-post/:id' that runs the likePost() function of the Post controller*/
router.patch("/unlike-post/:id", auth, postController.unlikePost) /*Creates an authenticated PATCH route on '/unlike-post/:id' that runs the unlikePost() function of the Post controller*/

/*------------Comments*/
router.patch("/comment-post/:id", auth, postController.commentPost) /*Creates an authenticated PATCH route on '/comment-post/:id' that runs the commentPost() function of the Post controller*/
router.patch("/edit-comment-post/:id", auth, postController.editCommentPost) /*Creates an authenticated PATCH route on '/edit-comment-post/:id' that runs the editCommentPost() function of the Post controller*/
router.delete("/delete-comment-post/:id", auth, postController.deleteCommentPost) /*Creates an authenticated DELETE route on '/delete-comment-post/:id' that runs the deleteCommentPost() function of the Post controller*/
/*-------------------------------------------------------------------------------------------------------------------*/


/*Export-------------------------------------------------------------------------------------------------------------*/
module.exports = router /*Exports the POST router to the app*/
/*-------------------------------------------------------------------------------------------------------------------*/