/*Imports------------------------------------------------------------------------------------------------------------*/
import axios from "axios"
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation----------------------------------------------------------------------------------------------------------*/
export const GET_USER = "GET_USER"
export const RESET = "RESET"

/*------------GET (User)*/
export default function GetUser(userId) {

    return (dispatch) => {
        axios.get(`${process.env.REACT_APP_API_URL}/groupomania/users/${userId}`, { withCredentials: true })

            .then(res => dispatch({ type: GET_USER, payload: res.data }))
            .catch(error => console.log(error))
    }
}

export function Reset() {

    return (dispatch) => {
        dispatch({ type: RESET, payload: {} })
    }
}
/*-------------------------------------------------------------------------------------------------------------------*/