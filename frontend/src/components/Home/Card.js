/*Imports------------------------------------------------------------------------------------------------------------*/
/*------------Redux & React modules*/
import { useSelector, useDispatch } from "react-redux"
import { useState } from "react"

/*------------Actions*/
import { UpdatePost } from "../Store/actions/posts.action"
import GetUser from "../Store/actions/user.action"

/*------------Components*/
import FollowHandler from "../Profile/FollowHandler"
import DeleteCard from "./DeleteCard"
import LikeButton from "./LikeButton"
import CardComments from "./CardComments"

/*------------Utils*/
import dateParser from "../Utils"
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation----------------------------------------------------------------------------------------------------------*/
export default function Card({ post }) { /*Exports to the Thread a Card component...*/

    /*------------Data*/
    const clientData = useSelector(state => state.clientReducer) /*...that gets the client data...*/
    const usersData = useSelector(state => state.usersReducer) /*...and the users data from the Store...*/
    const dispatch = useDispatch()

    const [updatePost, setUpdatePost] = useState(false)
    const [textUpdate, setTextUpdate] = useState(null)

    const [showComments, setShowComments] = useState(false)

    /*------------Middlewares*/
    function handleUpdate() { /*...then runs a handling middleware...*/
        dispatch(UpdatePost(textUpdate, post._id)) /*...running a Put (Update post) action...*/
        setUpdatePost(false) /*...and setting the UpdatePost State to "false"*/
    }

    function cancelUpdate() { /*...and a cancelling middleware...*/
        setTextUpdate(post.message) /*...setting the TextUpdate State to its initial state...*/
        setUpdatePost(false) /*...and the UpdatePost State to "false"*/
    }

    function seeProfile(e) {
        dispatch(GetUser(e.target.id))
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    /*------------Return*/
    return ( /*The Card component returns...*/
        <>
            <div className="card-left">
                <img
                    src={
                        usersData?.length && usersData.map(user => {
                            if (user._id === post.posterId) {
                                return user.picture /*...the profile picture...*/
                            }
                            return null
                        }).join('')
                    }
                    id={
                        usersData?.length && usersData.map(user => {
                            if (user._id === post.posterId) {
                                return user._id /*...the profile picture...*/
                            }
                            return null
                        }).join('')
                    }
                    alt="profile-pic"
                    className="see-user"
                    onClick={seeProfile}
                />
            </div>

            <div className="card-right">
                <div className="card-header">

                    <div className="pseudo">
                        <h3>
                            {usersData?.length && usersData.map(user => { /*...and the pseudo of the post creator...*/
                                if (user._id === post.posterId) {
                                    return user.pseudo
                                }
                                return null
                            })}
                        </h3>
                        {clientData._id !== post.posterId && clientData._id !== `${process.env.REACT_APP_ADMIN_ID}` && <FollowHandler idToFollow={post.posterId} type="card" />} {/*...and a FollowHandler component*/}
                    </div>

                    <span>{dateParser(post.createdAt)}</span>
                </div>

                {updatePost === false && <p>{post.message}</p>} {/*If the UpdatePost State is set to "false", it then returns a paragraph containing the message of the post*/}
                {updatePost === true && ( /*If it has been set to "true", the Card component instead returns...*/
                    <div className="update-post">
                        <textarea /*...a text area setting the TextUpdate State...*/
                            defaultValue={post.message}
                            onChange={(e) => setTextUpdate(e.target.value)}
                        />
                        <div className="button-container">
                            <button className="btn" onClick={cancelUpdate}>Annuler</button> {/*...a button running the cancelling middleware...*/}
                            <button className="btn" onClick={handleUpdate}>Valider modification</button> {/*...and another running the handling middleware*/}
                        </div>
                    </div>
                )}

                {post.picture && <img src={post.picture} alt="card-pic" className="card-pic" />}

                {(clientData._id === post.posterId || clientData._id === `${process.env.REACT_APP_ADMIN_ID}`) && ( /*If the client is the creator of the post...*/
                    <div className="button-container">
                        <div onClick={() => setUpdatePost(true)}> {/*...the Card component returns an icon that sets the UpdatePost State to "true" when clicked...*/}
                            <img src="./img/icons/edit.svg" alt="edit" />
                        </div>
                        <DeleteCard postId={post._id} /> {/*...and a DeleteCard component*/}
                    </div>
                )}

                <div className="card-footer"> {/*The Card component finally returns...*/}
                    <div className="comment-icon">
                        <img onClick={() => setShowComments(!showComments)} src="./img/icons/message1.svg" alt="comment" /> {/*...an image that sets the ShowComments State to "true" when clicked...*/}
                        <span>{post.comments.length}</span>
                    </div>
                    {clientData._id !== `${process.env.REACT_APP_ADMIN_ID}` && <LikeButton post={post} />} {/*...a LikeButton component...*/}
                </div>
                {showComments && <CardComments post={post} />} {/*...and, if the ShowComments State has been set to "true", a CardComments component*/}
            </div>
        </>
    )
}
/*-------------------------------------------------------------------------------------------------------------------*/