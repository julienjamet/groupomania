/*Imports------------------------------------------------------------------------------------------------------------*/
/*------------Redux & React modules*/
import { useSelector } from "react-redux"
import { useState } from "react"

/*------------Components*/
import LeftNav from "../Navbars/LeftNav"
import dateParser from "../Utils"
import FollowHandler from "./FollowHandler"
import Card from "../Home/Card"

export default function UserProfile() { /*Exports to the Profile page an UpdateProfile component...*/

    /*------------Data*/
    const userData = useSelector(state => state.userReducer) /*...that gets the client data...*/
    const usersData = useSelector(state => state.usersReducer) /*...and the users data from the Store...*/
    const postsData = useSelector(state => state.postsReducer)

    const [followings, setFollowings] = useState(false)
    const [followers, setFollowers] = useState(false)

    /*------------Return*/
    return ( /*The UpdateProfile component returns...*/
        <div className="profil-page">
            <div className="profil-container">
                <LeftNav /> {/*...the LeftNav component...*/}
                <h1>Profil de {userData.pseudo}</h1>
                <div className="update-container">
                    <div className="left-part">
                        <h3>Photo de profil</h3>
                        <img src={userData.picture} alt="user-pic" />
                    </div>
                    <div className="right-part">
                        <div className="bio-update">
                            <h3>Bio</h3>
                            <p>{userData.bio}</p> {/*...a clickable text box...*/}
                        </div>
                        <h4>Membre depuis le {dateParser(userData.createdAt)}</h4>
                        <h5 onClick={() => setFollowings(true)}>Abonnements : {userData.followings.length}</h5> {/*The UpdateProfile component then returns two items that respectively set the Followings State...*/}
                        <h5 onClick={() => setFollowers(true)}>Abonnés : {userData.followers.length}</h5> {/*...and the Followers State to "true" when clicked*/}
                    </div>
                </div>
                {followings && ( /*If the Followings State has been set to "true"...*/
                    <div className="popup-profil-container">
                        <div className="modal"> {/*...the UpdateProfile component returns a Followings pop-up...*/}
                            <h3>Abonnements</h3>
                            <span onClick={() => setFollowings(false)} className="cross">&#10005;</span>
                            <ul>
                                {usersData.map(user => {
                                    for (let i = 0; i < userData.followings.length; i++) {
                                        if (user._id === userData.followings[i]) {
                                            return ( /*...that returns, for each user found in the client's subscriptions list...*/
                                                <li key={user._id}>
                                                    <img src={user.picture} alt={`${user.pseudo} pic`} /> {/*...its profile picture...*/}
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
                                        for (let i = 0; i < userData.followers.length; i++) {
                                            if (user._id === userData.followers[i]) {
                                                return ( /*...that returns, for each user found in the client's followers list...*/
                                                    <li key={user._id}>
                                                        <img src={user.picture} alt={`${user.pseudo} pic`} /> {/*...its profile picture...*/}
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
            <div id="activity">
                <h2>Activité de {userData.pseudo}</h2>
                <div className="thread-container">
                    {userData._id !== `${process.env.REACT_APP_ADMIN_ID}` && <LeftNav />} {/*...the LeftNav component...*/}
                    <ul>
                        {postsData.map(post => { /*...and, for each post retrieved from the Store...*/
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