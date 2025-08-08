/*Imports------------------------------------------------------------------------------------------------------------*/
import axios from "axios"
import { GET_USERS } from "./users.action"
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation----------------------------------------------------------------------------------------------------------*/
export const GET_CLIENT = "GET_CLIENT"
export const PUT_IMAGE = "PUT_IMAGE"
export const PUT_BIO = "PUT_BIO"
export const FOLLOW_USER = "FOLLOW_USER"
export const FOLLOWED_USER = "FOLLOWED_USER"
export const UNFOLLOW_USER = "UNFOLLOW_USER"
export const UNFOLLOWED_USER = "UNFOLLOWED_USER"

/*------------GET (Client)*/
export default function GetClient(clientId) { /*Exports a Get (Client) action...*/

    return (dispatch) => {
        axios.get(`${process.env.REACT_APP_API_URL}/groupomania/users/${clientId}`, { withCredentials: true }) /*...that runs a GET (Client) request...*/

            .then(res => { dispatch({ type: GET_CLIENT, payload: res.data }) }) /*...then sends the retrieved data to the Client reducer*/
            .catch(error => console.log(error))
    }
}

/*------------PUT (Image)*/
export function PutImage(data, clientId) { /*Exports a Put (Image) action...*/
    console.log(data, clientId)
    return (dispatch) => {
        axios({ /*...that runs a PUT (Image) request...*/
            method: "put",
            url: `${process.env.REACT_APP_API_URL}/groupomania/users/${clientId}`,
            data: data,
            withCredentials: true
        })

            .then(() => {
                axios.get(`${process.env.REACT_APP_API_URL}/groupomania/users/${clientId}`, { withCredentials: true })
                    .then(res => { dispatch({ type: GET_CLIENT, payload: res.data }) }) /*...before sending the retrieved data to the Client reducer*/
                    .catch(error => console.log(error))

                axios.get(`${process.env.REACT_APP_API_URL}/groupomania/users`, { withCredentials: true })
                    .then(res => { dispatch({ type: GET_USERS, payload: res.data }) }) /*...before sending the retrieved data to the Client reducer*/
                    .catch(error => console.log(error))
            })
            .catch(error => console.log(error))
    }
}


/*------------PUT (Bio)*/
export function PutBio(bio, clientId) { /*Exports a Put (Bio) action...*/

    return (dispatch) => {
        axios({ /*...that runs a PUT (Bio) request...*/
            method: "put",
            url: `${process.env.REACT_APP_API_URL}/groupomania/users/${clientId}`,
            data: { bio },
            withCredentials: true
        })

            .then(() => { dispatch({ type: PUT_BIO, payload: { bio, clientId } }) }) /*...before sending the bio to the Client reducer*/
            .catch(error => console.log(error))
    }
}

/*------------PATCH (Follow user)*/
export function FollowUser(idToFollow, userId) { /*Exports a Patch (Follow) action...*/

    return (dispatch) => {
        axios({ /*...that runs a PATCH (Follow) request...*/
            method: "patch",
            url: `${process.env.REACT_APP_API_URL}/groupomania/users/follow/${userId}`,
            data: { idToFollow },
            withCredentials: true
        })

            .then(() => { /*...before sending the id to follow to the Client reducer*/
                dispatch({ type: FOLLOW_USER, payload: idToFollow })
                dispatch({ type: FOLLOWED_USER, payload: { userId, idToFollow } })
            })
            .catch(error => console.log(error))
    }
}

/*------------PATCH (Unfollow user)*/
export function UnfollowUser(idToUnfollow, userId) { /*Exports a Patch (Unfollow) action...*/

    return (dispatch) => {
        axios({ /*...that runs a PATCH (Unfollow) request...*/
            method: "patch",
            url: `${process.env.REACT_APP_API_URL}/groupomania/users/unfollow/${userId}`,
            data: { idToUnfollow },
            withCredentials: true
        })

            .then(() => { /*...before sending the id to unfollow to the Client reducer*/
                dispatch({ type: UNFOLLOW_USER, payload: idToUnfollow })
                dispatch({ type: UNFOLLOWED_USER, payload: { userId, idToUnfollow } })
            })
            .catch(error => console.log(error))
    }
}
/*-------------------------------------------------------------------------------------------------------------------*/