/*Imports------------------------------------------------------------------------------------------------------------*/
import { GET_CLIENT } from "../actions/client.action"
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation----------------------------------------------------------------------------------------------------------*/
/*------------Reducer initial state*/
const initialState = {} /*Creates an empty object as initial state*/

/*------------Reducer*/
export default function clientReducer(state = initialState, action) { /*Exports a Client reducer...*/

    switch (action.type) {
        case GET_CLIENT:
            return action.payload /*...that sends to the Store the data retrieved from the Client action*/

        default:
            return state
    }
}
/*-------------------------------------------------------------------------------------------------------------------*/