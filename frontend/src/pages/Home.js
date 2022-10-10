/*Imports------------------------------------------------------------------------------------------------------------*/
/*------------Redux modules*/
import { useSelector } from "react-redux"

/*------------Components*/
import NewPostForm from "../components/Home/NewPostForm"
import Thread from "../components/Home/Thread"
import LogModal from "../components/Log/LogModal"
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation----------------------------------------------------------------------------------------------------------*/
export default function Home() { /*Exports a Home component...*/

    /*------------Data*/
    const clientData = useSelector(state => state.clientReducer) /*...that gets the client data from the Store...*/

    /*------------Return*/
    return ( /*...then returns...*/
        <div className="profil-page">
            {clientData._id ? ( /*...if there is client data...*/
                <div className="main">
                    <div className="home-header">
                        <NewPostForm /> {/*...the NewPostForm component...*/}
                    </div>
                    <Thread /> {/*...the Thread component...*/}
                </div>
            ) : ( /*...and if there is no client data...*/
                <div className="log-container">
                    <LogModal /> {/*...the LogModal component*/}
                    <div className="img-container">
                        <img src="./img/log.svg" alt="img-log" />
                    </div>
                </div>
            )}
        </div>
    )
}
/*-------------------------------------------------------------------------------------------------------------------*/