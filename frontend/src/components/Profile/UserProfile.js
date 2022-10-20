/*Imports------------------------------------------------------------------------------------------------------------*/
/*------------Redux & React modules*/
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { NavLink } from "react-router-dom"

/*------------Components*/
import LeftNav from "../Navbars/LeftNav"
import Card from "../Home/Card"
import FollowHandler from "./FollowHandler"

/*------------Actions*/
import GetUser, { Reset } from "../Store/actions/user.action"

/*------------Utils*/
import dateParser from "../Utils"
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation-----------------------------------------------------------------------------------------------------------*/
export default function UserProfile() { /*Exports to the Home page a UserProfile component...*/

    /*------------Data*/
    const clientData = useSelector(state => state.clientReducer) /*...that gets the client data...*/
    const userData = useSelector(state => state.userReducer) /*...the user data...*/
    const usersData = useSelector(state => state.usersReducer) /*...the users data...*/
    const allPostsData = useSelector(state => state.allPostsReducer) /*...and the posts data from the Store...*/
    const dispatch = useDispatch()

    const [followings, setFollowings] = useState(false)
    const [followers, setFollowers] = useState(false)
    const [firstTime, setFirstTime] = useState(true)

    /*------------Middlewares*/
    if (firstTime) { /*...then runs a FirstTime middleware*/
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        setFirstTime(false) /*...setting the FirstTime State to false...*/
    }

    function seeProfile(e) { /*...a SeeProfile middleware...*/
        if (followers) {
            setFollowers(false) /*...setting the Followers...*/
            dispatch(GetUser(e.target.id))
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        }
        else if (followings) {
            setFollowings(false) /*...or the Followings State to false...*/
            dispatch(GetUser(e.target.id)) /*...and running a Get (User) action*/
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        }
    }

    function editProfile() { /*...and an EditProfile middleware...*/
        dispatch(Reset()) /*...running itself a Reset action*/
    }

    /*------------Return*/
    return ( /*The UserProfile component returns...*/
        <div className="profil-page">
            <div className="profil-container">
                <LeftNav /> {/*...the LeftNav component...*/}
                <h1>Profil de {userData.pseudo}</h1> {/*...and some user data*/}
                <div className="update-container">
                    <div className="left-part">
                        <h3>Photo de profil</h3>
                        <img src={userData.picture} alt="user-pic" />
                        {userData._id !== clientData._id && clientData._id !== `${process.env.REACT_APP_ADMIN_ID}` && <FollowHandler idToFollow={userData._id} type="suggestion" />} {/*If the user is not not client, it returns a FollowHandler component*/}
                        {userData._id === clientData._id && (
                            <NavLink to="/profile" onClick={editProfile}> {/*If the user is the client, it returns instead a button that runs the EditProfile middleware when clicked*/}
                                <button id="edit-profile">Editer le profil</button>
                            </NavLink>
                        )}
                    </div>
                    <div className="right-part">
                        <div className="bio-update">
                            <h3>Bio</h3>
                            <p>{userData.bio}</p>
                        </div>
                        <h4>Membre depuis le {dateParser(userData.createdAt)}</h4>
                        <h5 onClick={() => setFollowings(true)}>Abonnements : {userData.followings.length}</h5> {/*The UserProfile component then returns two items that respectively set the Followings State...*/}
                        <h5 onClick={() => setFollowers(true)}>Abonnés : {userData.followers.length}</h5> {/*...and the Followers State to "true" when clicked*/}
                    </div>
                </div>
                {followings && ( /*If the Followings State has been set to "true"...*/
                    <div className="popup-profil-container">
                        <div className="modal"> {/*...the UserProfile component returns a Followings pop-up...*/}
                            <h3>Abonnements</h3>
                            <span onClick={() => setFollowings(false)} className="cross">&#10005;</span>
                            <ul>
                                {usersData.map(user => {
                                    for (let i = 0; i < userData.followings.length; i++) {
                                        if (user._id === userData.followings[i]) {
                                            return ( /*...that returns, for each user found in the user's subscriptions list...*/
                                                <li key={user._id}>
                                                    <img
                                                        src={user.picture}
                                                        id={user._id}
                                                        className="see-user"
                                                        onClick={seeProfile}
                                                        alt={`${user.pseudo} pic`}
                                                    /> {/*...its profile picture...*/}
                                                    <p>{user.pseudo}</p> {/*...its name...*/}
                                                    <div className="follow-handler">
                                                        {(clientData._id !== user._id && clientData._id !== `${process.env.REACT_APP_ADMIN_ID}`) && <FollowHandler idToFollow={user._id} type="suggestion" />} {/*...and the FollowHandler component*/}
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
                            <div className="modal"> {/*...the UserProfile component returns a Followers pop-up...*/}
                                <h3>Abonnés</h3>
                                <span onClick={() => setFollowers(false)} className="cross">&#10005;</span>
                                <ul>
                                    {usersData.map(user => {
                                        for (let i = 0; i < userData.followers.length; i++) {
                                            if (user._id === userData.followers[i]) {
                                                return ( /*...that returns, for each user found in the user's followers list...*/
                                                    <li key={user._id}>
                                                        <img
                                                            src={user.picture}
                                                            id={user._id}
                                                            className="see-user"
                                                            onClick={seeProfile}
                                                            alt={`${user.pseudo} pic`}
                                                        /> {/*...its profile picture...*/}
                                                        <p>{user.pseudo}</p> {/*...its name...*/}

                                                        <div className="follow-handler">
                                                            {(clientData._id !== user._id && clientData._id !== `${process.env.REACT_APP_ADMIN_ID}`) && <FollowHandler idToFollow={user._id} type="suggestion" />} {/*...and the FollowHandler component*/}
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
            <div id="activity"> {/*The UserProfile component finnaly returns...*/}
                <h2>Activité de {userData.pseudo}</h2>
                <div className="thread-container">
                    <ul>
                        {allPostsData.map(post => { /*...for each post retrieved from the Store that has been created by the user...*/
                            if (post.posterId === userData._id) {
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
        </div>
    )
}
/*-------------------------------------------------------------------------------------------------------------------*/