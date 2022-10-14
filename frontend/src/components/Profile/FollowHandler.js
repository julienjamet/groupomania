/*Imports------------------------------------------------------------------------------------------------------------*/
/*------------Redux & React modules*/
import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from "react"

/*------------Actions*/
import { FollowUser } from "../Store/actions/client.action"
import { UnfollowUser } from "../Store/actions/client.action"
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation----------------------------------------------------------------------------------------------------------*/
export default function FollowHandler({ idToFollow, type }) { /*Exports to the UpdateProfile and the Thread a FollowHandler component...*/

    /*------------Data*/
    const clientData = useSelector(state => state.clientReducer) /*...that gets the client data from the Store...*/
    const dispatch = useDispatch()

    const [isFollowed, setIsFollowed] = useState(false)

    /*------------Middlewares*/
    function handleFollow() { /*...then runs a Follow middleware...*/
        dispatch(FollowUser(idToFollow, clientData._id)) /*...running a Patch (Follow) action...*/
        setIsFollowed(true) /*...and setting the IsFollowed State to "true"...*/
    }

    function handleUnfollow() { /*...an Unfollow middleware...*/
        dispatch(UnfollowUser(idToFollow, clientData._id)) /*...running a Patch (Unfollow) action...*/
        setIsFollowed(false) /*...and setting the IsFollowed State to "false"...*/
    }

    useEffect(() => { /*...and a UseEffect hook...*/
        if (clientData.followings.includes(idToFollow)) { /*...checking if the user is followed or not*/
            setIsFollowed(true)
        }
        else {
            setIsFollowed(false)
        }
    }, [idToFollow, clientData.followings])

    /*------------Return*/
    return ( /*The FollowHandler component returns...*/
        <>
            {isFollowed && ( /*...if the user is followed...*/
                <span>
                    {type === "suggestion" && /*...an item running the Unfollow middleware when clicked...*/
                        <button onClick={handleUnfollow} className="unfollow-btn">Abonné</button>}
                    {type === "card" &&
                        <img onClick={handleUnfollow} src="./img/icons/checked.svg" alt="checked" />}
                </span>
            )}
            {!isFollowed && ( /*...and if the user is not followed...*/
                <span>
                    {type === "suggestion" && /*...an item running the Follow middleware when clicked*/
                        <button onClick={handleFollow} className="follow-btn">Suivre</button>}
                    {type === "card" &&
                        <img onClick={handleFollow} src="./img/icons/check.svg" alt="check" />}
                </span>
            )}
        </>
    )
}
/*-------------------------------------------------------------------------------------------------------------------*/