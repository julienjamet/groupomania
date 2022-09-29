import axios from "axios"
import { useContext, useState } from "react"
import { UserDataContext } from "./AppContext"

function Followings() {
    const userData = useContext(UserDataContext)
    const [followingListId, setFollowingListId] = useState([])
    const [followingsData, setFollowingsData] = useState([])

    function getData() {
        for (let each of followingListId) {
            return axios({
                method: "get",
                url: `http://localhost:5000/api/user/${each}`,
                withCredentials: true
            })
                .then(res => {
                    return setFollowingsData(res.data)
                })
                .catch(error => console.log(error))
        }
    }

    axios({
        method: "get",
        url: `http://localhost:5000/api/user/${userData._id}`,
        withCredentials: true
    })
        .then(res => {
            setFollowingListId(res.data.followings)
            return getData()
        })
        .catch(error => console.log(error))


    return (
        <ul>
            <li>
                <img src={followingsData.picture} alt={`${followingsData.pseudo} pic`} />
                <span>{followingsData.pseudo}</span>
            </li>
        </ul>
    )

}

export default Followings