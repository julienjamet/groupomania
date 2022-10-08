/*Imports------------------------------------------------------------------------------------------------------------*/
/*------------Redux modules*/
import { useSelector } from "react-redux"

/*------------Components*/
import LeftNav from "../Navbars/LeftNav"
import Card from "./Card"
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation----------------------------------------------------------------------------------------------------------*/
export default function Thread() { /*Exports a Thread component...*/

    /*------------Data*/
    const postsData = useSelector(state => state.postsReducer) /*...that gets the posts data from the Store...*/

    /*------------Return*/
    return ( /*...then returns...*/
        <div className="thread-container">
            <LeftNav /> {/*...the LeftNav component...*/}
            <ul>
                {postsData.map(post => { /*...and, for each post retrieved from the Store...*/
                    return (
                        <li key={post._id} className="card-container">
                            <Card post={post} /> {/*...a Card component*/}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
/*-------------------------------------------------------------------------------------------------------------------*/