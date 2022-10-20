/*Imports------------------------------------------------------------------------------------------------------------*/
/*------------Redux modules*/
import { combineReducers } from "redux"

/*------------Reducers*/
import usersReducer from "./users.reducer"
import userReducer from "./user.reducer"
import postsReducer from "./posts.reducer"
import allPostsReducer from "./allPosts.reducer"
import clientReducer from "./client.reducer"
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation----------------------------------------------------------------------------------------------------------*/
export default combineReducers({ usersReducer, userReducer, postsReducer, allPostsReducer, clientReducer }) /*Exports to the Root a Root reducer that combines all reducers*/
/*-------------------------------------------------------------------------------------------------------------------*/