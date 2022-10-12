import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import FollowHandler from "./FollowHandler"

export default function FriendsHint() {
    const clientData = useSelector(state => state.clientReducer)
    const usersData = useSelector(state => state.usersReducer)

    const [FollowAll, setFollowAll] = useState(false)
    const [friendsHint, setFriendsHint] = useState([])

    useEffect(() => {
        function notFriendList() {
            let array = []

            usersData.map(user => {
                if (user._id !== clientData._id && user._id !== "634461c6f95f3d408f5fa269" && !clientData.followings.includes(user._id)) {
                    return array.push(user._id)
                }
                else {
                    return null
                }
            })

            array.sort(() => 0.5 - Math.random())

            setFriendsHint(array.slice(0, 10))

            if (clientData.followings.length + 2 === usersData.length) {
                setFollowAll(true)
            }
            else {
                setFollowAll(false)
            }
        }

        notFriendList()

    }, [clientData._id, clientData.followings, usersData])

    return (
        <div className="get-friends-container">
            <h4>Suggestions</h4>
            <ul>
                {FollowAll && (
                    <>
                        <h5>Vous suivez tous les utilisateurs du réseau !</h5>
                        <h6>Félicitations !</h6>
                        <img src="./img/all.jpg" id="all" width="100%" alt="follow-all" />
                    </>
                )}
                {friendsHint.map(user => {
                    for (let i = 0; i < usersData.length; i++) {
                        if (user === usersData[i]._id) {
                            return (
                                <li className="user-hint" key={user}>
                                    <img src={usersData[i].picture} alt="friend-pic" />
                                    <p>{usersData[i].pseudo}</p>
                                    <FollowHandler idToFollow={usersData[i]._id} type="suggestion" />
                                </li>
                            )
                        }
                    }
                })}
            </ul>
        </div>
    )
}