/*Imports------------------------------------------------------------------------------------------------------------*/
import axios from "axios"
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation----------------------------------------------------------------------------------------------------------*/
export const GET_POSTS = "GET_POSTS"
export const GET_ALL_POSTS = "GET_ALL_POSTS"
export const ADD_POST = "ADD_POST"
export const LIKE_POST = "LIKE_POST"
export const UNLIKE_POST = "UNLIKE_POST"
export const UPDATE_POST = "UPDATE_POST"
export const DELETE_POST = "DELETE_POST"
export const ADD_COMMENT = "ADD_COMMENT"
export const EDIT_COMMENT = "EDIT_COMMENT"
export const DELETE_COMMENT = "DELETE_COMMENT"

/*------------GET (All posts)*/
export default function GetPosts(num) { /*Exports a Get (All posts) action...*/

    return (dispatch) => {
        axios.get('https://api.julienjamet-groupomania.com/api/post', { withCredentials: true }) /*...that runs a GET (All posts) request...*/

            .then(res => {
                const array = res.data.slice(0, num)
                dispatch({ type: GET_POSTS, payload: array }) /*...then sends the retrieved data to the Posts reducer*/
            })
            .catch(error => console.log(error))
    }
}

export function GetAllPosts() {

    return (dispatch) => {
        axios.get('https://api.julienjamet-groupomania.com/api/post', { withCredentials: true })

            .then(res => dispatch({ type: GET_ALL_POSTS, payload: res.data }))
            .catch(error => console.log(error))

    }
}

/*------------POST (Post)*/
export function AddPost(data) { /*Exports a Post (Add post) action...*/

    return (dispatch) => {
        axios({ /*...that runs a POST (Add post) request...*/
            method: "post",
            url: `https://api.julienjamet-groupomania.com/api/post`,
            data: data,
            withCredentials: true
        })

            .then(() => {
                axios.get('https://api.julienjamet-groupomania.com/api/post', { withCredentials: true }) /*...that runs a GET (All posts) request...*/

                    .then(res => {
                        dispatch({ type: GET_ALL_POSTS, payload: res.data })
                        dispatch({ type: GET_POSTS, payload: res.data }) /*...then sends the retrieved data to the Posts reducer*/
                    })
                    .catch(error => console.log(error))
            })
            .catch(error => console.log(error))
    }
}

/*------------PATCH (Like)*/
export function LikePost(clientId, postId) { /*Exports a Patch (Like) action...*/

    return (dispatch) => {
        axios({ /*...that runs a PATCH (Like) request...*/
            method: "patch",
            url: `https://api.julienjamet-groupomania.com/api/post/like-post/${postId}`,
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
            url: `https://api.julienjamet-groupomania.com/api/post/unlike-post/${postId}`,
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
            url: `https://api.julienjamet-groupomania.com/api/post/${postId}`,
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
            url: `https://api.julienjamet-groupomania.com/api/post/${postId}`,
            withCredentials: true
        })
            .then(() => { dispatch({ type: DELETE_POST, payload: { postId } }) }) /*...before sending the data to the Posts reducer*/
            .catch(error => console.log(error))
    }
}

/*------------PATCH (Add comment)*/
export function AddComment(postId, commenterId, text, commenterPseudo) { /*Exports a Patch (Add comment) action...*/

    return (dispatch) => {
        axios({ /*...that runs a PATCH request...*/
            method: "patch",
            url: `https://api.julienjamet-groupomania.com/api/post/comment-post/${postId}`,
            data: { commenterId, text, commenterPseudo },
            withCredentials: true
        })
            .then(() => {
                axios.get(`https://api.julienjamet-groupomania.com/api/post/`, { withCredentials: true }) /*...then runs a GET (Client) request...*/

                    .then(res => {/*...before sending the retrieved data to the Posts reducer*/
                        dispatch({ type: GET_POSTS, payload: res.data })
                        dispatch({ type: GET_ALL_POSTS, payload: res.data })
                    })
                    .catch(error => console.log(error))
            })
            .catch(error => console.log(error))
    }
}

/*------------PATCH (Edit comment)*/
export function EditComment(postId, commentId, commenterId, text) { /*Exports a Patch (Edit comment) action...*/

    return (dispatch) => {
        axios({ /*...that runs a PATCH request...*/
            method: "patch",
            url: `https://api.julienjamet-groupomania.com/api/post/edit-comment-post/${postId}`,
            data: { commentId, commenterId, text },
            withCredentials: true
        })
            .then(() => { dispatch({ type: EDIT_COMMENT, payload: { postId, commentId, commenterId, text } }) }) /*...before sending the data to the Posts reducer*/
            .catch(error => console.log(error))
    }
}

/*------------DELETE (comment)*/
export function DeleteComment(postId, commentId, commenterId) { /*Exports a Delete (comment) action...*/

    return (dispatch) => {
        axios({ /*...that runs a DELETE request...*/
            method: "delete",
            url: `https://api.julienjamet-groupomania.com/api/post/delete-comment-post/${postId}`,
            data: { commentId, commenterId },
            withCredentials: true
        })
            .then(() => { dispatch({ type: DELETE_COMMENT, payload: { postId, commentId } }) }) /*...before sending the data to the Posts reducer*/
            .catch(error => console.log(error))
    }
}
/*-------------------------------------------------------------------------------------------------------------------*/