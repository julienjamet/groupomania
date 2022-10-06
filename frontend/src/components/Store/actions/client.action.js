/*Imports------------------------------------------------------------------------------------------------------------*/
import axios from "axios"
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation----------------------------------------------------------------------------------------------------------*/
/*------------Action type*/
export const GET_CLIENT = "GET_CLIENT" /*Exports a "Client" action type*/

/*------------Action*/
export default function GetClient(userId) { /*Exports a Client action...*/

    return (dispatch) => {
        axios.get(`http://localhost:5000/api/user/${userId}`, { withCredentials: true }) /*...that runs a GET (One user) request...*/

            .then(res => { dispatch({ type: GET_CLIENT, payload: res.data }) }) /*...then sends the retrieved data to the Client reducer*/
            .catch(error => console.log(error))
    }
}
/*-------------------------------------------------------------------------------------------------------------------*/