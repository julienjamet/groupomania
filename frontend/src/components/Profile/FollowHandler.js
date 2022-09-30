import { useContext, useEffect, useState } from "react"
import { UserDataContext } from "../AppContext"
import axios from "axios"

function FollowHandler({ idToFollow }) {
    const userData = useContext(UserDataContext)
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
                    <button onClick={handleUnfollow} className="unfollow-btn">Abonné</button>
                </span>
            )}
            {!isFollowed && (
                <span>
                    <button onClick={handleFollow} className="follow-btn">Suivre</button>
                </span>
            )}
        </>
    )
}

export default FollowHandler