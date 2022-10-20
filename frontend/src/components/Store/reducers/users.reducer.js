/*Imports------------------------------------------------------------------------------------------------------------*/
import { FOLLOWED_USER, UNFOLLOWED_USER } from "../actions/client.action"
import { GET_USERS } from "../actions/users.action"
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation----------------------------------------------------------------------------------------------------------*/
const initialState = {}

export default function usersReducer(state = initialState, action) { /*Exports a Users reducer...*/

    switch (action.type) {

        case GET_USERS:
            return action.payload /*...that sends to the Store the data retrieved from the Users action*/

        case FOLLOWED_USER:
            return state.map(user => {
                if (user._id === action.payload.idToFollow) {
                    return {
                        ...user,
                        followers: [action.payload.userId, ...user.followers]
                    }
                }
                else {
                    return user
                }
            })

        case UNFOLLOWED_USER:
            return state.map(user => {
                if (user._id === action.payload.idToUnfollow) {
                    return {
                        ...user,
                        followers: user.followers.filter(id => id !== action.payload.userId)
                    }
                }
                else {
                    return user
                }
            })

        default:
            return state
    }
}
/*-------------------------------------------------------------------------------------------------------------------*/