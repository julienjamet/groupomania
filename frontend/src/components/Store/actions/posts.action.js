/*Imports------------------------------------------------------------------------------------------------------------*/
import axios from "axios"
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation----------------------------------------------------------------------------------------------------------*/
export const GET_POSTS = "GET_POSTS"

/*------------GET (All posts)*/
export default function GetPosts() { /*Exports a Get (All posts) action...*/

    return (dispatch) => {
        axios.get('http://localhost:5000/api/post', { withCredentials: true }) /*...that runs a GET (All posts) request...*/

            .then(res => { dispatch({ type: GET_POSTS, payload: res.data }) }) /*...then sends the retrieved data to the Posts reducer*/
            .catch(error => console.log(error))
    }
}
/*-------------------------------------------------------------------------------------------------------------------*/