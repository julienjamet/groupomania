/*Imports------------------------------------------------------------------------------------------------------------*/
import axios from "axios"
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation----------------------------------------------------------------------------------------------------------*/
/*------------Action type*/
export const GET_USERS = "GET_USERS" /*Exports a "Users" action type*/

/*------------Action*/
export default function GetUsers() { /*Exports a Users action...*/

    return (dispatch) => {
        axios.get('http://localhost:5000/api/user', { withCredentials: true }) /*...that runs a GET (All users) request...*/

            .then(res => { dispatch({ type: GET_USERS, payload: res.data }) }) /*...then sends the retrieved data to the Users reducer*/
            .catch(error => console.log(error))
    }
}
/*-------------------------------------------------------------------------------------------------------------------*/