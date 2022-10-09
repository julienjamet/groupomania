/*Imports------------------------------------------------------------------------------------------------------------*/
/*------------Redux & React modules*/
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"

/*------------Components*/
import FollowHandler from "../Profile/FollowHandler"

/*------------Utils*/
import { timestampParser } from "../Utils"
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation----------------------------------------------------------------------------------------------------------*/
export default function CardComments({ post }) { /*Exports a CardComments component...*/

    /*------------Data*/
    const clientData = useSelector(state => state.clientReducer) /*...that gets the client data...*/
    const usersData = useSelector(state => state.usersReducer) /*...and the users data from the Store...*/
    const dispatch = useDispatch()

    const [text, setText] = useState("")

    /*------------Middleware*/
    function handleComment(e) {
        e.preventDefault()

        if (text) {
            dispatch()
        }
    }

    /*------------Return*/
    return (
        <div className="comments-container">
            {post.comments.map(comment => {
                return (
                    <div key={comment._id} className={comment.commenterId === clientData._id ? "comment-container client" : "comment-container"}>
                        <div className="left-part">
                            <img src={
                                usersData.map(user => {
                                    if (user._id === comment.commenterId) {
                                        return user.picture /*...the profile picture...*/
                                    }
                                    return null
                                }).join('')
                            } alt="commenter-pic" />
                        </div>

                        <div className="right-part">
                            <div className="comment-header">
                                <div className="pseudo">
                                    <h4>{comment.commenterPseudo}</h4>

                                    {clientData._id !== comment.commenterId && <FollowHandler idToFollow={comment.commenterId} type="card" />}
                                </div>

                                <span>{timestampParser(comment.timestamp)}</span>
                            </div>

                            <p>{comment.text}</p>
                        </div>
                    </div>
                )
            })}

            <form action="" onSubmit={handleComment} className="comment-form">
                <input placeholder="Laisser un commentaire" value={text} type="text" name="text" onChange={(e) => setText(e.target.value)} />
                <br />
                <input type="submit" value="Envoyer" />
            </form>
        </div>
    )
}
/*-------------------------------------------------------------------------------------------------------------------*/