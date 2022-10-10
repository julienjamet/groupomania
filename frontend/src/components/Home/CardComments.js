/*Imports------------------------------------------------------------------------------------------------------------*/
/*------------Redux & React modules*/
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"

/*------------Components*/
import FollowHandler from "../Profile/FollowHandler"
import EditDeleteComment from "./EditDeleteComment"

/*------------Utils*/
import { timestampParser } from "../Utils"
import { AddComment } from "../Store/actions/posts.action"
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation----------------------------------------------------------------------------------------------------------*/
export default function CardComments({ post }) { /*Exports a CardComments component...*/

    /*------------Data*/
    const clientData = useSelector(state => state.clientReducer) /*...that gets the client data...*/
    const usersData = useSelector(state => state.usersReducer) /*...and the users data from the Store...*/
    const dispatch = useDispatch()

    const [text, setText] = useState("")

    /*------------Middleware*/
    function handleComment(e) { /*...then runs a middleware...*/
        e.preventDefault()

        dispatch(AddComment(post._id, clientData._id, text, clientData.pseudo)) /*...running itself a Patch (Add comment) action...*/
        setText("") /*...before resetting the Text State*/
    }

    /*------------Return*/
    return ( /*The CardComments component returns...*/
        <div className="comments-container">
            {post.comments.map(comment => { /*...for each comment retrieved from the Store...*/
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
                                    <h4>{comment.commenterPseudo}</h4> {/*...and the pseudo of the creator of the comment...*/}

                                    {clientData._id !== comment.commenterId && <FollowHandler idToFollow={comment.commenterId} type="card" />} {/*...a Followhandler component...*/}
                                </div>

                                <span>{timestampParser(comment.timestamp)}</span>
                            </div>

                            <p>{comment.text}</p> {/*...the body of the comment...*/}

                            {(clientData._id === comment.commenterId || clientData._id === "634461c6f95f3d408f5fa269") && <EditDeleteComment comment={comment} postId={post._id} />} {/*...and, if the client is the creator of the comment, an EditDeleteComment component*/}
                        </div>
                    </div>
                )
            })}

            <form action="" onSubmit={handleComment} className="comment-form"> {/*The CardComments component finally returns a form running the middleware when submitted...*/}
                <input placeholder="Ecrire un commentaire ici" value={text} type="text" name="text" onChange={(e) => setText(e.target.value)} /> {/*...and whose input sets the Text State*/}
                <br />
                <input type="submit" id="comment-button" value="Envoyer" />
            </form>
        </div>
    )
}
/*-------------------------------------------------------------------------------------------------------------------*/