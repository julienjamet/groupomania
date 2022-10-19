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
            return {
                ...state,
                followers: [action.payload, ...state.followers]
            }

        case UNFOLLOWED_USER:
            return {
                ...state,
                followers: state.followers.filter(id => id !== action.payload)
            }

        case RESET:
            return action.payload

        default:
            return state
    }
}
/*-------------------------------------------------------------------------------------------------------------------*/