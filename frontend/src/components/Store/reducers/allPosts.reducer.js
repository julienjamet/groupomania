/*Imports------------------------------------------------------------------------------------------------------------*/
import { GET_ALL_POSTS, LIKE_POST, UNLIKE_POST, UPDATE_POST, DELETE_POST, EDIT_COMMENT, DELETE_COMMENT } from "../actions/posts.action"
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation----------------------------------------------------------------------------------------------------------*/
const initialState = {}

export default function allPostsReducer(state = initialState, action) { /*Exports a Users reducer...*/

    switch (action.type) {

        case GET_ALL_POSTS:
            return action.payload /*...that sends to the Store the data retrieved from the Users action*/

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

        case UPDATE_POST:
            return state.map(post => {
                if (post._id === action.payload.postId) {
                    return {
                        ...post,
                        message: action.payload.message
                    }
                }
                else {
                    return post
                }
            })

        case DELETE_POST:
            return state.filter(post => post._id !== action.payload.postId)

        case EDIT_COMMENT:
            return state.map(post => {
                if (post._id === action.payload.postId) {
                    return {
                        ...post,
                        comments: post.comments.map(comment => {
                            if (comment._id === action.payload.commentId) {
                                return {
                                    ...comment,
                                    text: action.payload.text
                                }
                            }
                            return comment
                        })
                    }
                }
                return post
            })

        case DELETE_COMMENT:
            return state.map(post => {
                if (post._id === action.payload.postId) {
                    return {
                        ...post,
                        comments: post.comments.filter(comment => comment._id !== action.payload.commentId)
                    }
                }
                return post
            })

        default:
            return state
    }
}
/*-------------------------------------------------------------------------------------------------------------------*/