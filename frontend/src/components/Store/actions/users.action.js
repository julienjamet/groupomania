import axios from "axios"

export const GET_USERS = "GET_USERS"

function GetUsers() {
    return (dispatch) => {
        axios({
            method: "get",
            url: `http://localhost:5000/api/user`,
            withCredentials: true
        })
            .then(res => {
                dispatch({ type: GET_USERS, payload: res.data })
            })
            .catch(error => console.log(error))
    }
}

export default GetUsers