/*Imports------------------------------------------------------------------------------------------------------------*/
/*------------Modules*/
import axios from "axios" /*Imports Axios*/
import { useContext, useState } from "react" /*Imports the useContext() hook*/

/*------------Components*/
import { UserDataContext } from "../AppContext" /*Imports the Context*/
import LeftNav from "../Navbars/LeftNav" /*Imports the LeftNav component*/
import dateParser from "../Utils"
import UploadImg from "./UploadImg" /*Imports the UploadImg component*/
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation----------------------------------------------------------------------------------------------------------*/
function UpdateProfile() { /*Runs an UpdateProfile() function...*/
    /*------------Calls*/
    const userData = useContext(UserDataContext) /*...that runs itself the useContext() hook to retrieve the user data*/
    const [bio, setBio] = useState('')
    const [updateForm, setUpdateForm] = useState(false)

    /*Middlewares*/
    function handleUpdate() {
        axios({
            method: "put",
            url: `http://localhost:5000/api/user/${userData._id}`,
            data: { "bio": bio },
            withCredentials: true
        })
            .then(() => { setUpdateForm(false) })
            .catch(error => console.log(error))
    }

    /*------------Return*/
    return ( /*The function then returns...*/
        <div className="profil-container">
            <LeftNav />
            <h1>Profil de {userData.pseudo}</h1> {/*...some authenticated data...*/}
            <div className="update-container">
                <div className="left-part">
                    <h3>Photo de profil</h3>
                    <img src={userData.picture} alt="user-pic" />
                    <UploadImg /> {/*...and the UploadImg component*/}
                </div>
                <div className="right-part">
                    <div className="bio-update">
                        <h3>Bio</h3>
                        {updateForm === false ? (
                            <>
                                <p onClick={() => setUpdateForm(true)}>{userData.bio}</p>
                                <button onClick={() => setUpdateForm(true)}>Modifier bio</button>
                            </>
                        ) : (
                            <>
                                <textarea
                                    type="text"
                                    autoFocus
                                    placeholder="Ecrivez votre bio ici..."
                                    defaultValue={userData.bio}
                                    onChange={(e) => setBio(e.target.value)}
                                ></textarea>
                                <button onClick={handleUpdate}>Valider modification</button>
                                <button onClick={() => setUpdateForm(false)}>Annuler</button>
                            </>
                        )}
                    </div>
                    <h4>Membre depuis le {dateParser(userData.createdAt)}</h4>
                    <h5>Abonnements : {userData.followings.length}</h5>
                    <h5>Abonnés : {userData.followers.length}</h5>
                </div>
            </div>
        </div>
    )
}
/*-------------------------------------------------------------------------------------------------------------------*/


/*Export-------------------------------------------------------------------------------------------------------------*/
export default UpdateProfile /*Exports the UpdateProfile component to the Profile component*/
/*-------------------------------------------------------------------------------------------------------------------*/