import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import GetUser from "../Store/actions/user.action"
import FollowHandler from "./FollowHandler"

export default function FriendsHint() {
    const clientData = useSelector(state => state.clientReducer)
    const usersData = useSelector(state => state.usersReducer)
    const dispatch = useDispatch()

    const [loadOnce, setLoadOnce] = useState(false)
    const [FollowAll, setFollowAll] = useState(false)
    const [allAreFollowed, setAllAreFollowed] = useState(false)
    const [friendsHint, setFriendsHint] = useState([])

    function notFriendList() {
        let array = []

        usersData.map(user => {
            if (user._id !== clientData._id && user._id !== "634461c6f95f3d408f5fa269" && !clientData.followings.includes(user._id)) {
                return array.push(user)
            }
            else {
                return null
            }
        })

        array.sort(() => 0.5 - Math.random())

        setFriendsHint(array.slice(0, 10))
    }

    if (!loadOnce) {
        notFriendList()
        setLoadOnce(true)
    }

    useEffect(() => {
        if (clientData.followings.length + 2 === usersData.length) {
            setFollowAll(true)
            setAllAreFollowed(true)
        }
        else {
            setFollowAll(false)
        }

        if (allAreFollowed && !FollowAll) {
            notFriendList()
        }
    }, [clientData.followings.length, usersData.length, FollowAll, allAreFollowed])

    function seeProfile(e) {
        if (clientData._id !== e.target.id) {
            dispatch(GetUser(e.target.id))
        }
    }

    return (
        <div className="get-friends-container">
            <h4>Suggestions</h4>
            <ul>
                {FollowAll ? (
                    <>
                        <h5>Vous suivez tous les utilisateurs du réseau !</h5>
                        <h6>Félicitations !</h6>
                        <img src="./img/all.jpg" id="all" width="100%" alt="follow-all" />
                    </>
                ) : (
                    friendsHint.map(user => {
                        return (
                            <li className="user-hint" key={user._id}>
                                <img
                                    src={user.picture}
                                    id={
                                        usersData.map(users => {
                                            if (users._id === user._id) {
                                                return user._id /*...the profile picture...*/
                                            }
                                            return null
                                        }).join('')
                                    }
                                    alt="friend-pic"
                                    onClick={seeProfile} />
                                <p>{user.pseudo}</p>
                                <FollowHandler idToFollow={user._id} type="suggestion" />
                            </li>
                        )
                    })
                )}
            </ul>
        </div>
    )
}