/*Imports------------------------------------------------------------------------------------------------------------*/
import { GET_POSTS } from "../actions/posts.action"
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation----------------------------------------------------------------------------------------------------------*/
const initialState = {}

export default function postsReducer(state = initialState, action) { /*Exports a Posts reducer...*/

    switch (action.type) {
        case GET_POSTS:
            return action.payload /*...that sends to the Store the data retrieved from the Posts action*/

        default:
            return state
    }
}
/*-------------------------------------------------------------------------------------------------------------------*/