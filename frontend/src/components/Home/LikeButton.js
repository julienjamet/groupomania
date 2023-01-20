/*Imports------------------------------------------------------------------------------------------------------------*/
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { LikePost, UnlikePost } from "../Store/actions/posts.action"
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation----------------------------------------------------------------------------------------------------------*/
export default function LikeButton({ post }) { /*Exports to the Card a Likebutton component...*/

    /*------------Data*/
    const clientData = useSelector(state => state.clientReducer) /*...that gets the client data from the Store...*/
    const dispatch = useDispatch()

    const [liked, setLiked] = useState(false)

    /*------------Middlewares*/
    function likeHandle() { /*...then runs a Like middleware...*/
        dispatch(LikePost(clientData._id, post._id)) /*...running a Patch (Like) action...*/
        setLiked(true) /*...and setting the Liked State to "true"...*/
    }

    function unlikeHandle() { /*...an Unlike middleware...*/
        dispatch(UnlikePost(clientData._id, post._id)) /*...running a Patch (Unlike) action...*/
        setLiked(false) /*...and setting the Liked State to "false"...*/
    }

    useEffect(() => { /*...and a UseEffect hook...*/
        if (post.likers.includes(clientData._id)) { /*...checking if the post is liked or not*/
            setLiked(true)
        }
        else {
            setLiked(false)
        }
    }, [clientData._id, post.likers, liked])

    /*------------Return*/
    return ( /*The LikeButton component returns...*/
        <div className="like-container">
            {clientData && liked === false && ( /*...depending on whether the Liked State is set to "true" or "false"...*/
                <img src="./img/icons/heart.svg" onClick={likeHandle} alt="like" /> /*...an icon that runs the Like middleware...*/
            )}
            {clientData && liked === true && (
                <img src="./img/icons/heart-filled.svg" onClick={unlikeHandle} alt="unlike" /> /*...or the Unlike middleware*/
            )}
            <span>{post.likers.length}</span>
        </div>
    )
}
/*-------------------------------------------------------------------------------------------------------------------*/