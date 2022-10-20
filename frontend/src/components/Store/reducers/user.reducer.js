/*Imports------------------------------------------------------------------------------------------------------------*/
import { FOLLOWED_USER, UNFOLLOWED_USER } from "../actions/client.action"
import { GET_USER, RESET } from "../actions/user.action"
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation----------------------------------------------------------------------------------------------------------*/
const initialState = {}

export default function userReducer(state = initialState, action) { /*Exports a Client reducer...*/
    switch (action.type) {
        case GET_USER:
            return action.payload

        case FOLLOWED_USER:
            if (state._id === action.payload.idToFollow) {
                return {
                    ...state,
                    followers: [action.payload.userId, ...state.followers]
                }
            }
            else {
                return state
            }

        case UNFOLLOWED_USER:
            if (state._id === action.payload.idToUnfollow) {
                return {
                    ...state,
                    followers: state.followers.filter(id => id !== action.payload.userId)
                }
            }
            else {
                return state
            }

        case RESET:
            return action.payload

        default:
            return state
    }
}
/*-------------------------------------------------------------------------------------------------------------------*/