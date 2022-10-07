/*Imports------------------------------------------------------------------------------------------------------------*/
/*------------Redux & React modules*/
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"

/*------------Actions*/
import { PutBio } from "../Store/actions/client.action"

/*------------Components*/
import LeftNav from "../Navbars/LeftNav"
import UploadImage from "./UploadImage"
import dateParser from "../Utils"
import FollowHandler from "./FollowHandler"
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation----------------------------------------------------------------------------------------------------------*/
export default function UpdateProfile() { /*Exports an UpdateProfile component...*/

    /*------------Data*/
    const clientData = useSelector(state => state.clientReducer) /*...that gets the client data...*/
    const usersData = useSelector(state => state.usersReducer) /*...and the users data from the Store...*/
    const dispatch = useDispatch()

    const [bio, setBio] = useState(clientData.bio)
    const [updateForm, setUpdateForm] = useState(false)

    const [followings, setFollowings] = useState(false)
    const [followers, setFollowers] = useState(false)

    /*Middlewares*/
    function handleUpdate() { /*...then runs a handling middleware...*/
        dispatch(PutBio(bio, clientData._id)) /*...sending the data to the Store...*/
        setUpdateForm(false) /*...and setting the UpdateForm State to "false"*/
    }

    function cancelUpdate() { /*...and a cancelling middleware...*/
        setBio(clientData.bio) /*...setting the Bio State to its initial state...*/
        setUpdateForm(false) /*...and the UpdateForm State to "false"*/
    }

    /*------------Return*/
    return ( /*The UpdateProfile component returns...*/
        <div className="profil-container">
            <LeftNav /> {/*...the LeftNav component...*/}
            <h1>Profil de {clientData.pseudo}</h1>
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
            )}
            {followers && ( /*If the Followers State has been set to "true"...*/
                <div className="popup-profil-container">
                    <div className="modal"> {/*...the UpdateProfile component returns a Followers pop-up...*/}
                        <h3>Abonnés</h3>
                        <span onClick={() => setFollowers(false)} className="cross">&#10005;</span>
                        <ul>
                            {usersData.map((user) => {
                                for (let i = 0; i < clientData.followers.length; i++) {
                                    if (user._id === clientData.followers[i]) {
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
            )}
        </div>
    )
}
/*-------------------------------------------------------------------------------------------------------------------*/