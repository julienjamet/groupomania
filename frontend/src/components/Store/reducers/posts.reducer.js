import { GET_POSTS } from "../actions/posts.action"

const initialState = {}

function postsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_POSTS:
            return action.payload

        default:
            return state
    }
}

export default postsReducer