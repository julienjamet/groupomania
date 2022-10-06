/*import { useContext, useEffect, useState } from "react"
import { UserDataContext } from "./AppContext"
import axios from "axios"
import { useDispatch } from "react-redux"
import { LikePost } from "./Store/actions/posts.action"

export default function LikeButton({ post }) {
    const [liked, setLiked] = useState(false)
    const userData = useContext(UserDataContext)
    const dispatch = useDispatch()

    useEffect(() => {
        if (post.likers.includes(userData._id)) {
            setLiked(true)
        }
    }, [userData, post.likers, liked])


    function likeHandle() {
        dispatch(LikePost(userData._id, post))
    }

    function unlikeHandle() {
        axios({
            method: "patch",
            url: `http://localhost:5000/api/post/unlike-post/${post._id}`,
            data: { "id": userData._id },
            withCredentials: true
        })
            .then(() => { setLiked(false) })
            .catch(error => console.log(error))
    }

    return (
        <div className="like-container">
            {userData && liked === false && (
                <img src="./img/icons/heart.svg" onClick={likeHandle} alt="like" />
            )}
            {userData && liked === true && (
                <img src="./img/icons/heart-filled.svg" onClick={unlikeHandle} alt="unlike" />
            )}
        </div>
    )
}*/