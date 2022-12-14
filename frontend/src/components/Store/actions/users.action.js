/*Imports------------------------------------------------------------------------------------------------------------*/
import axios from "axios"
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation----------------------------------------------------------------------------------------------------------*/
export const GET_USERS = "GET_USERS"

/*------------GET (All users)*/
export default function GetUsers() { /*Exports a Get (All users) action...*/

    return (dispatch) => {
        axios.get('http://localhost:5000/api/user', { withCredentials: true }) /*...that runs a GET (All users) request...*/

            .then(res => { dispatch({ type: GET_USERS, payload: res.data }) }) /*...then sends the retrieved data to the Users reducer*/
            .catch(error => console.log(error))
    }
}
/*-------------------------------------------------------------------------------------------------------------------*/