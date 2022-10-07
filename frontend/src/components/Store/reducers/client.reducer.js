/*Imports------------------------------------------------------------------------------------------------------------*/
import { GET_CLIENT, PUT_IMAGE, PUT_BIO } from "../actions/client.action"
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation----------------------------------------------------------------------------------------------------------*/
const initialState = {}

export default function clientReducer(state = initialState, action) { /*Exports a Client reducer...*/

    switch (action.type) {
        case GET_CLIENT:
            return action.payload /*...that sends to the Store the data retrieved from the Client action*/

        case PUT_IMAGE:
            return action.payload

        case PUT_BIO:
            return action.payload

        default:
            return state
    }
}
/*-------------------------------------------------------------------------------------------------------------------*/