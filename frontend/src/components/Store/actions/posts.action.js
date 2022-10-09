/*Imports------------------------------------------------------------------------------------------------------------*/
import axios from "axios"
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation----------------------------------------------------------------------------------------------------------*/
export const GET_POSTS = "GET_POSTS"
export const LIKE_POST = "LIKE_POST"
export const UNLIKE_POST = "UNLIKE_POST"
export const UPDATE_POST = "UPDATE_POST"
export const DELETE_POST = "DELETE_POST"

/*------------GET (All posts)*/
export default function GetPosts(num) { /*Exports a Get (All posts) action...*/

    return (dispatch) => {
        axios.get('http://localhost:5000/api/post', { withCredentials: true }) /*...that runs a GET (All posts) request...*/

            .then(res => {
                const array = res.data.slice(0, num)
                dispatch({ type: GET_POSTS, payload: array }) /*...then sends the retrieved data to the Posts reducer*/
            })
            .catch(error => console.log(error))
    }
}

/*------------PATCH (Like)*/
export function LikePost(clientId, postId) { /*Exports a Patch (Like) action...*/

    return (dispatch) => {
        axios({ /*...that runs a PATCH (Like) request...*/
            method: "patch",
            url: `http://localhost:5000/api/post/like-post/${postId}`,
            data: { "id": clientId },
            withCredentials: true
        })

            .then(() => { dispatch({ type: LIKE_POST, payload: { clientId, postId } }) }) /*...before sending the id to like to the Posts reducer*/
            .catch(error => console.log(error))
    }
}

/*------------PATCH (Unlike)*/
export function UnlikePost(clientId, postId) { /*Exports a Patch (Unlike) action...*/

    return (dispatch) => {
        axios({ /*...that runs a PATCH (Unlike) request...*/
            method: "patch",
            url: `http://localhost:5000/api/post/unlike-post/${postId}`,
            data: { "id": clientId },
            withCredentials: true
        })

            .then(() => { dispatch({ type: UNLIKE_POST, payload: { clientId, postId } }) }) /*...before sending the id to unlike to the Posts reducer*/
            .catch(error => console.log(error))
    }
}

/*------------PUT (Update)*/
export function UpdatePost(message, postId) { /*Exports a Put (Update) action...*/

    return (dispatch) => {
        axios({ /*...that runs a PUT (Update) request...*/
            method: "put",
            url: `http://localhost:5000/api/post/${postId}`,
            data: { message },
            withCredentials: true
        })
            .then(() => { dispatch({ type: UPDATE_POST, payload: { message, postId } }) }) /*...before sending the data to the Posts reducer*/
            .catch(error => console.log(error))
    }
}

/*------------DELETE*/
export function DeletePost(postId) { /*Exports a Delete action...*/

    return (dispatch) => {
        axios({ /*...that runs a DELETE request...*/
            method: "delete",
            url: `http://localhost:5000/api/post/${postId}`,
            withCredentials: true
        })
            .then(() => { dispatch({ type: DELETE_POST, payload: { postId } }) }) /*...before sending the data to the Posts reducer*/
            .catch(error => console.log(error))
    }
}
/*-------------------------------------------------------------------------------------------------------------------*/