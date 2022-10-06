import { useContext, useEffect, useState } from "react"
import { useSelector } from "react-redux"

import axios from "axios"

function FollowHandler({ idToFollow, type }) {
    const userData = useSelector(state => state.clientReducer)
    const [isFollowed, setIsFollowed] = useState(false)

    function handleFollow() {
        axios({
            method: "patch",
            url: `http://localhost:5000/api/user/follow/${userData._id}`,
            data: { "idToFollow": idToFollow },
            withCredentials: true
        })
            .then(() => { setIsFollowed(true) })
            .catch(error => console.log(error))
    }

    function handleUnfollow() {
        axios({
            method: "patch",
            url: `http://localhost:5000/api/user/unfollow/${userData._id}`,
            data: { "idToUnfollow": idToFollow },
            withCredentials: true
        })
            .then(() => { setIsFollowed(false) })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        if (userData.followings.includes(idToFollow)) {
            setIsFollowed(true)
        }
        else {
            setIsFollowed(false)
        }

    }, [userData, idToFollow])

    return (
        <>
            {isFollowed && (
                <span>
                    {type === "suggestion" &&
                        <button onClick={handleUnfollow} className="unfollow-btn">Abonné</button>}
                    {type === "card" &&
                        <img onClick={handleUnfollow} src="./img/icons/checked.svg" alt="checked" />}
                </span>
            )}
            {!isFollowed && (
                <span>
                    {type === "suggestion" &&
                        <button onClick={handleFollow} className="follow-btn">Suivre</button>}
                    {type === "card" &&
                        <img onClick={handleFollow} src="./img/icons/check.svg" alt="check" />}
                </span>
            )}
        </>
    )
}

export default FollowHandler