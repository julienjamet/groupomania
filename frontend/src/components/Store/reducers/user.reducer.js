/*Imports------------------------------------------------------------------------------------------------------------*/
import { GET_USER, RESET } from "../actions/user.action"
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation----------------------------------------------------------------------------------------------------------*/
const initialState = {}

export default function userReducer(state = initialState, action) { /*Exports a Client reducer...*/
    switch (action.type) {
        case GET_USER:
            return action.payload

        case RESET:
            return action.payload

        default:
            return state
    }
}
/*-------------------------------------------------------------------------------------------------------------------*/