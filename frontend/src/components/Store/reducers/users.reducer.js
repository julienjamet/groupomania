/*Imports------------------------------------------------------------------------------------------------------------*/
import { GET_USERS } from "../actions/users.action"
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation----------------------------------------------------------------------------------------------------------*/
const initialState = {}

export default function usersReducer(state = initialState, action) { /*Exports a Users reducer...*/

    switch (action.type) {
        case GET_USERS:
            return action.payload /*...that sends to the Store the data retrieved from the Users action*/

        default:
            return state
    }
}
/*-------------------------------------------------------------------------------------------------------------------*/