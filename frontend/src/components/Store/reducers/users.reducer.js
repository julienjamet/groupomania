/*Imports------------------------------------------------------------------------------------------------------------*/
import { PUT_BIO, UNFOLLOWED_USER } from "../actions/client.action"
import { GET_USERS } from "../actions/users.action"
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation----------------------------------------------------------------------------------------------------------*/
const initialState = {}

export default function usersReducer(state = initialState, action) { /*Exports a Users reducer...*/

    switch (action.type) {

        case GET_USERS:
            return action.payload /*...that sends to the Store the data retrieved from the Users action*/

        case UNFOLLOWED_USER:
            return state.map(user => {
                if (user.followings.includes(action.payload.userId)) {
                    return {
                        ...user,
                        followings: user.followings.filter(id => id !== action.payload.userId)
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