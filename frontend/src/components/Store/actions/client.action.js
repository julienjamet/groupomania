/*Imports------------------------------------------------------------------------------------------------------------*/
import axios from "axios"
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation----------------------------------------------------------------------------------------------------------*/
export const GET_CLIENT = "GET_CLIENT"
export const PUT_IMAGE = "PUT_IMAGE"
export const PUT_BIO = "PUT_BIO"
export const FOLLOW_USER = "FOLLOW_USER"
export const UNFOLLOW_USER = "UNFOLLOW_USER"

/*------------GET (Client)*/
export default function GetClient(clientId) { /*Exports a Get (Client) action...*/

    return (dispatch) => {
        axios.get(`http://localhost:5000/api/user/${clientId}`, { withCredentials: true }) /*...that runs a GET (Client) request...*/

            .then(res => { dispatch({ type: GET_CLIENT, payload: res.data }) }) /*...then sends the retrieved data to the Client reducer*/
            .catch(error => console.log(error))
    }
}

/*------------PUT (Image)*/
export function PutImage(data, clientId) { /*Exports a Put (Image) action...*/

    return (dispatch) => {
        axios({ /*...that runs a PUT (Image) request...*/
            method: "put",
            url: `http://localhost:5000/api/user/${clientId}`,
            data: data,
            withCredentials: true
        })

            .then(() => {
                axios.get(`http://localhost:5000/api/user/${clientId}`, { withCredentials: true }) /*...then runs a GET (Client) request...*/

                    .then(res => { dispatch({ type: GET_CLIENT, payload: res.data }) }) /*...before sending the retrieved data to the Client reducer*/
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
            url: `http://localhost:5000/api/user/${clientId}`,
            data: { bio },
            withCredentials: true
        })

            .then(() => { dispatch({ type: PUT_BIO, payload: bio }) }) /*...before sending the bio to the Client reducer*/
            .catch(error => console.log(error))
    }
}

/*------------PATCH (Follow user)*/
export function FollowUser(idToFollow, userId) { /*Exports a Patch (Follow) action...*/

    return (dispatch) => {
        axios({ /*...that runs a PATCH (Follow) request...*/
            method: "patch",
            url: `http://localhost:5000/api/user/follow/${userId}`,
            data: { idToFollow },
            withCredentials: true
        })

            .then(() => { dispatch({ type: FOLLOW_USER, payload: idToFollow }) }) /*...before sending the id to follow to the Client reducer*/
            .catch(error => console.log(error))
    }
}

/*------------PATCH (Unfollow user)*/
export function UnfollowUser(idToUnfollow, userId) { /*Exports a Patch (Unfollow) action...*/

    return (dispatch) => {
        axios({ /*...that runs a PATCH (Unfollow) request...*/
            method: "patch",
            url: `http://localhost:5000/api/user/unfollow/${userId}`,
            data: { idToUnfollow },
            withCredentials: true
        })

            .then(() => { dispatch({ type: UNFOLLOW_USER, payload: idToUnfollow }) }) /*...before sending the id to unfollow to the Client reducer*/
            .catch(error => console.log(error))
    }
}
/*-------------------------------------------------------------------------------------------------------------------*/