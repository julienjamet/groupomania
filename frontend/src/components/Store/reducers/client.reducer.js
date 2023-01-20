/*Imports------------------------------------------------------------------------------------------------------------*/
import { GET_CLIENT, PUT_BIO, FOLLOW_USER, UNFOLLOW_USER } from "../actions/client.action"
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation----------------------------------------------------------------------------------------------------------*/
const initialState = {}

export default function clientReducer(state = initialState, action) { /*Exports a Client reducer...*/

    switch (action.type) {
        case GET_CLIENT:
            return action.payload /*...that sends to the Store the data retrieved from the Client actions*/

        case PUT_BIO:
            return {
                ...state,
                bio: action.payload.bio
            }

        case FOLLOW_USER:
            return {
                ...state,
                followings: [action.payload, ...state.followings]
            }

        case UNFOLLOW_USER:
            return {
                ...state,
                followings: state.followings.filter(id => id !== action.payload)
            }

        default:
            return state
    }
}
/*-------------------------------------------------------------------------------------------------------------------*/