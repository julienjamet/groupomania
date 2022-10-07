/*Imports------------------------------------------------------------------------------------------------------------*/
import axios from "axios"
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation----------------------------------------------------------------------------------------------------------*/
export const GET_CLIENT = "GET_CLIENT"
export const PUT_IMAGE = "PUT_IMAGE"
export const PUT_BIO = "PUT_BIO"

/*------------GET (Client)*/
export default function GetClient(clientId) { /*Exports a Get Client action...*/

    return (dispatch) => {
        axios.get(`http://localhost:5000/api/user/${clientId}`, { withCredentials: true }) /*...that runs a GET (Client) request...*/

            .then(res => { dispatch({ type: GET_CLIENT, payload: res.data }) }) /*...then sends the retrieved data to the Client reducer*/
            .catch(error => console.log(error))
    }
}

/*------------PUT (Image)*/
export function PutImage(data, clientId) { /*Exports a Put Image action...*/

    return (dispatch) => {
        axios({ /*...that runs a PUT (Image) request...*/
            method: "put",
            headers: { "Content-Type": "multipart/form-data" },
            url: `http://localhost:5000/api/user/${clientId}`,
            data: data,
            withCredentials: true
        })

            .then(() => {
                axios.get(`http://localhost:5000/api/user/${clientId}`, { withCredentials: true }) /*...then runs a GET (Client) request...*/

                    .then(res => dispatch({ type: PUT_IMAGE, payload: res.data })) /*...before sending the retrieved data to the Client reducer*/
                    .catch(error => console.log(error))
            })
            .catch(error => console.log(error))
    }
}

/*------------PUT (Bio)*/
export function PutBio(bio, clientId) { /*Exports a Put Bio action...*/

    return (dispatch) => {
        axios({ /*...that runs a PUT (Bio) request...*/
            method: "put",
            url: `http://localhost:5000/api/user/${clientId}`,
            data: { "bio": bio },
            withCredentials: true
        })

            .then(() => {
                axios.get(`http://localhost:5000/api/user/${clientId}`, { withCredentials: true }) /*...then runs a GET (Client) request...*/

                    .then(res => { dispatch({ type: PUT_BIO, payload: res.data }) }) /*...before sending the retrieved data to the Client reducer*/
                    .catch(error => console.log(error))
            })
            .catch(error => console.log(error))
    }
}
/*-------------------------------------------------------------------------------------------------------------------*/