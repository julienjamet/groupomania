import axios from "axios"

export const GET_POSTS = "GET_POSTS"

function GetPosts() {
    return (dispatch) => {
        axios({
            method: "get",
            url: `http://localhost:5000/api/post`,
            withCredentials: true
        })
            .then(res => {
                dispatch({ type: GET_POSTS, payload: res.data })
            })
            .catch(error => console.log(error))
    }
}

export default GetPosts