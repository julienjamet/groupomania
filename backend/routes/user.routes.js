/*Calls--------------------------------------------------------------------------------------------------------------*/
/*------------Modules*/
const router = require('express').Router() /*Calls Express then creates an Express router*/

/*------------Middlewares*/
const auth = require('../middlewares/auth.middleware') /*Calls the Auth middleware*/
const multer = require('../middlewares/multer.middleware') /*Calls the Multer middleware*/

/*------------Controllers*/
const authController = require('../controllers/auth.controller') /*Calls the Auth controller*/
const userController = require('../controllers/user.controller') /*Calls the User controller*/
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation----------------------------------------------------------------------------------------------------------*/
/*------------Auth*/
router.post("/register", authController.signUp) /*Creates a POST route on '/register' that runs the signUp() function of the Auth controller*/
router.post("/login", authController.signIn) /*Creates a POST route on '/login' that runs the signIn() function of the Auth controller*/
router.get("/logout", auth, authController.logOut) /*Creates a GET route on '/logout' that runs the logOut() function of the Auth controller*/

/*------------Users*/
router.get("/", auth, userController.getAllUsers) /*Creates an authenticated GET route on '/' that runs the getAllUsers() function of the User controller*/
router.get("/:id", auth, userController.userInfo) /*Creates an authenticated GET route on '/:id' that runs the userInfo() function of the User controller*/
router.put("/:id", auth, multer, userController.updateUser) /*Creates an authenticated PUT route on '/:id' that runs the updateUser() function of the User controller*/
router.delete("/:id", auth, userController.deleteUser) /*Creates an authenticated DELETE route on '/:id' that runs the deleteUser() function of the User controller*/

/*------------Follow*/
router.patch("/follow/:id", auth, userController.follow) /*Creates an authenticated PATCH route on '/follow/:id' that runs the follow() function of the User controller*/
router.patch("/unfollow/:id", auth, userController.unfollow) /*Creates an authenticated PATCH route on '/follow/:id' that runs the unfollow() function of the User controller*/
/*-------------------------------------------------------------------------------------------------------------------*/


/*Export-------------------------------------------------------------------------------------------------------------*/
module.exports = router /*Exports the User router to the app*/
/*-------------------------------------------------------------------------------------------------------------------*/