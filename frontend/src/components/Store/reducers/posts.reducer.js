/*Imports------------------------------------------------------------------------------------------------------------*/
import { GET_POSTS, LIKE_POST, UNLIKE_POST } from "../actions/posts.action"
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation----------------------------------------------------------------------------------------------------------*/
const initialState = {}

export default function postsReducer(state = initialState, action) { /*Exports a Posts reducer...*/

    switch (action.type) {
        case GET_POSTS:
            return action.payload /*...that sends to the Store the data retrieved from the Posts action*/

        case LIKE_POST:
            return state.map(post => {
                if (post._id === action.payload.postId) {
                    return {
                        ...post,
                        likers: [action.payload.clientId, ...post.likers]
                    }
                }
                else {
                    return post
                }
            })

        case UNLIKE_POST:
            return state.map(post => {
                if (post._id === action.payload.postId) {
                    return {
                        ...post,
                        likers: post.likers.filter(id => id !== action.payload.clientId)
                    }
                }
                else {
                    return post
                }
            })

        default:
            return state
    }
}
/*-------------------------------------------------------------------------------------------------------------------*/