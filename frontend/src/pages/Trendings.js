/*Imports------------------------------------------------------------------------------------------------------------*/
/*------------Redux modules*/
import { useSelector } from "react-redux"

/*------------Components*/
import LogModal from "../components/Log/LogModal"
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation----------------------------------------------------------------------------------------------------------*/
export default function Trendings() { /*Exports to the App a Trendings component...*/

    /*------------Data*/
    const clientData = useSelector(state => state.clientReducer) /*...that gets the client data from the Store...*/

    /*------------Return*/
    return ( /*...then returns...*/
        <div className="profil-page">
            {clientData._id ? ( /*...if there is client data...*/
                <h1>VIEW TRENDINGS</h1> /*...the ViewTrendings component...*/
            ) : ( /*...and if there is no client data...*/
                < div className="log-container">
                    <LogModal /> {/*...the LogModal component*/}
                    <div className="img-container">
                        <img src="./img/log.svg" alt="img-log" />
                    </div>
                </div>
            )
            }
        </div >
    )
}
/*-------------------------------------------------------------------------------------------------------------------*/