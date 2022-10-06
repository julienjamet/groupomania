/*Imports------------------------------------------------------------------------------------------------------------*/
/*------------Redux modules*/
import { combineReducers } from "redux"

/*------------Reducers*/
import usersReducer from "./users.reducer"
import postsReducer from "./posts.reducer"
import clientReducer from "./client.reducer"
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation----------------------------------------------------------------------------------------------------------*/
export default combineReducers({ usersReducer, postsReducer, clientReducer }) /*Exports to the Root a Root reducer that combines all reducers*/
/*-------------------------------------------------------------------------------------------------------------------*/