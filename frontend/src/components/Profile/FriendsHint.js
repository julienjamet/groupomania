/*Imports------------------------------------------------------------------------------------------------------------*/
/*------------Redux & React modules*/
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"

/*------------Actions*/
import GetUser from "../Store/actions/user.action"

/*------------Components*/
import FollowHandler from "./FollowHandler"
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation----------------------------------------------------------------------------------------------------------*/
export default function FriendsHint() {

    /*------------Data*/
    const clientData = useSelector(state => state.clientReducer)
    const usersData = useSelector(state => state.usersReducer)
    const dispatch = useDispatch()

    const [loadOnce, setLoadOnce] = useState(false)
    const [FollowAll, setFollowAll] = useState(false)
    const [allAreFollowed, setAllAreFollowed] = useState(false)
    const [friendsHint, setFriendsHint] = useState([])

    /*------------Middlewares*/
    function notFriendList() {
        let array = []

        usersData?.length && usersData.map(user => {
            if (user._id !== clientData._id && user._id !== `${process.env.REACT_APP_ADMIN_ID}` && !clientData.followings.includes(user._id)) {
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
        // eslint-disable-next-line
    }, [clientData.followings.length, usersData.length, FollowAll, allAreFollowed])

    function seeProfile(e) {
        dispatch(GetUser(e.target.id))
    }

    /*------------Return*/
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
                                    id={user._id}
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
/*-------------------------------------------------------------------------------------------------------------------*/