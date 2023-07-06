/*Imports------------------------------------------------------------------------------------------------------------*/
/*------------Redux, React & Axios modules*/
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import axios from "axios"

/*------------Actions*/
import { PutBio, UnfollowUser } from "../Store/actions/client.action"
import { DeleteComment, DeletePost, UnlikePost } from "../Store/actions/posts.action"
import GetUser from "../Store/actions/user.action"

/*------------Components*/
import LeftNav from "../Navbars/LeftNav"
import UploadImage from "./UploadImage"
import FollowHandler from "./FollowHandler"
import Card from "../Home/Card"
import UserProfile from "./UserProfile"

/*------------Utils*/
import dateParser from "../Utils"
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation----------------------------------------------------------------------------------------------------------*/
export default function UpdateProfile() { /*Exports to the Profile page an UpdateProfile component...*/

    /*------------Data*/
    const clientData = useSelector(state => state.clientReducer) /*...that gets the client data...*/
    const usersData = useSelector(state => state.usersReducer) /*...the users data...*/
    const userData = useSelector(state => state.userReducer) /*...the user data*/
    const allPostsData = useSelector(state => state.allPostsReducer) /*...and the users data from the Store...*/
    const dispatch = useDispatch()

    const [bio, setBio] = useState(clientData.bio)
    const [updateForm, setUpdateForm] = useState(false)

    const [followings, setFollowings] = useState(false)
    const [followers, setFollowers] = useState(false)

    /*Middlewares*/
    function handleUpdate() { /*...then runs a handling middleware...*/
        dispatch(PutBio(bio, clientData._id)) /*...running a Put (Bio) action...*/
        setUpdateForm(false) /*...and setting the UpdateForm State to "false"*/
    }

    function cancelUpdate() { /*...a cancelling middleware...*/
        setBio(clientData.bio) /*...setting the Bio State to its initial state...*/
        setUpdateForm(false) /*...and the UpdateForm State to "false"*/
    }


    function seeProfile(e) { /*...a SeeProfile middleware*/
        if (followers) {
            setFollowers(false) /*...setting the Followers State...*/
            dispatch(GetUser(e.target.id))
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        }
        else if (followings) {
            setFollowings(false) /*...or the Followings State to "false"...*/
            dispatch(GetUser(e.target.id)) /*...and running a Get (User) action*/
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        }
    }


    async function handleDelete() { /*...and a HandleDelete middleware that removes the client, its posts, comments, likes and follows from the database...*/
        await usersData.map(user => {
            if (user.followers.includes(clientData._id)) {
                return dispatch(UnfollowUser(user._id, clientData._id))
            }
            else {
                return null
            }
        })

        await allPostsData.map(post => {
            if (post.posterId === clientData._id) {
                return dispatch(DeletePost(post._id))
            }
            else {
                return null
            }
        })

        await allPostsData.map(post => {
            return post.comments.map(comment => {
                if (comment.commenterId === clientData._id) {
                    return dispatch(DeleteComment(post._id, comment._id, comment.commenterId))
                }
                else {
                    return null
                }
            })
        })

        await allPostsData.map(post => {
            if (post.likers.includes(clientData._id)) {
                return dispatch(UnlikePost(clientData._id, post._id))
            }
            else {
                return null
            }
        })

        await axios.delete(`https://api.julienjamet-groupomania.com/api/user/${clientData._id}`, { withCredentials: true })
            .then(() => {
                window.location = "/home" /*...before redirecting the user to the Home page*/
            })
    }

    /*------------Return*/
    return ( /*The UpdateProfile component returns...*/
        <>
            {!userData._id ? (
                <>
                    <div className="profil-container">
                        <LeftNav /> {/*...the LeftNav component...*/}
                        <div id="profile-title">
                            <h1>Profil de {clientData.pseudo}</h1>
                            <button onClick={() => {
                                /*...a button running the handleDelete middleware when clicked...*/
                                if (window.confirm("Attention, cette action est irréversible ! Voulez-vous vraiment supprimer votre compte ?")) {
                                    handleDelete()
                                }
                            }}>Supprimer le compte</button>
                        </div>
                        <div className="update-container">
                            <div className="left-part">
                                <h3>Photo de profil</h3>
                                <img src={clientData.picture} alt="user-pic" />
                                <UploadImage /> {/*...and the UploadImg component*/}
                            </div>
                            <div className="right-part">
                                <div className="bio-update">
                                    <h3>Bio</h3>
                                    {updateForm === false ? ( /*If the UpdateForm State is set to "false", it also returns...*/
                                        <>
                                            <p onClick={() => setUpdateForm(true)}>{clientData.bio}</p> {/*...a clickable text box...*/}
                                            <button onClick={() => setUpdateForm(true)}>Modifier bio</button> {/*...and a button, both setting the UpdateForm State to "true"*/}
                                        </>
                                    ) : ( /*If the UpdateForm State has been set to "true", the UpdateProfile component instead returns...*/
                                        <>
                                            <textarea /*...a text area setting the Bio State...*/
                                                type="text"
                                                autoFocus
                                                placeholder="Ecrivez votre bio ici..."
                                                defaultValue={clientData.bio}
                                                onChange={(e) => setBio(e.target.value)}
                                            ></textarea>
                                            <button onClick={handleUpdate}>Valider modification</button> {/*...a button running the handling middleware...*/}
                                            <button onClick={cancelUpdate}>Annuler</button> {/*...and another running the cancelling middleware*/}
                                        </>
                                    )}
                                </div>
                                <h4>Membre depuis le {dateParser(clientData.createdAt)}</h4>
                                <h5 onClick={() => setFollowings(true)}>Abonnements : {clientData.followings.length}</h5> {/*The UpdateProfile component then returns two items that respectively set the Followings State...*/}
                                <h5 onClick={() => setFollowers(true)}>Abonnés : {clientData.followers.length}</h5> {/*...and the Followers State to "true" when clicked*/}
                            </div>
                        </div>
                        {followings && ( /*If the Followings State has been set to "true"...*/
                            <div className="popup-profil-container">
                                <div className="modal"> {/*...the UpdateProfile component returns a Followings pop-up...*/}
                                    <h3>Abonnements</h3>
                                    <span onClick={() => setFollowings(false)} className="cross">&#10005;</span>
                                    <ul>
                                        {usersData.map(user => {
                                            for (let i = 0; i < clientData.followings.length; i++) {
                                                if (user._id === clientData.followings[i]) {
                                                    return ( /*...that returns, for each user found in the client's subscriptions list...*/
                                                        <li key={user._id}>
                                                            <img
                                                                src={user.picture}
                                                                alt={`${user.pseudo} pic`}
                                                                id={user._id}
                                                                className="see-user"
                                                                onClick={seeProfile}
                                                            /> {/*...its profile picture...*/}
                                                            <p>{user.pseudo}</p> {/*...its name...*/}
                                                            <div className="follow-handler">
                                                                <FollowHandler idToFollow={user._id} type="suggestion" /> {/*...and the FollowHandler component*/}
                                                            </div>
                                                        </li>
                                                    )
                                                }
                                            }
                                            return null
                                        })}
                                    </ul>
                                </div>
                            </div>
                        )
                        }
                        {
                            followers && ( /*If the Followers State has been set to "true"...*/
                                <div className="popup-profil-container">
                                    <div className="modal"> {/*...the UpdateProfile component returns a Followers pop-up...*/}
                                        <h3>Abonnés</h3>
                                        <span onClick={() => setFollowers(false)} className="cross">&#10005;</span>
                                        <ul>
                                            {usersData.map(user => {
                                                for (let i = 0; i < clientData.followers.length; i++) {
                                                    if (user._id === clientData.followers[i]) {
                                                        return ( /*...that returns, for each user found in the client's followers list...*/
                                                            <li key={user._id}>
                                                                <img
                                                                    src={user.picture}
                                                                    alt={`${user.pseudo} pic`}
                                                                    id={user._id}
                                                                    className="see-user"
                                                                    onClick={seeProfile}
                                                                /> {/*...its profile picture...*/}
                                                                <p>{user.pseudo}</p> {/*...its name...*/}
                                                                <div className="follow-handler">
                                                                    <FollowHandler idToFollow={user._id} type="suggestion" /> {/*...and the FollowHandler component*/}
                                                                </div>
                                                            </li>
                                                        )
                                                    }
                                                }
                                                return null
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            )
                        }
                    </div >
                    <div id="activity"> {/*The UpdateProfile component finally returns...*/}
                        <h2>Activité de {clientData.pseudo}</h2>
                        <div className="thread-container">
                            <ul>
                                {allPostsData.map(post => { /*...for each post retrieved from the Store that has been created by the client...*/
                                    if (post.posterId === clientData._id) {
                                        return (
                                            <li key={post._id} className="card-container">
                                                <Card post={post} /> {/*...a Card component*/}
                                            </li>
                                        )
                                    }
                                    else {
                                        return null
                                    }
                                })}
                            </ul>
                        </div>
                    </div>
                </>
            ) : (
                <UserProfile /> /*If there is client data, the UpdateProfile component returns instead a UserProfile component*/
            )}
        </>
    )
}
/*-------------------------------------------------------------------------------------------------------------------*/