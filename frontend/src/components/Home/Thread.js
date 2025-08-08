/*Imports------------------------------------------------------------------------------------------------------------*/
/*------------Redux & React modules*/
import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"

/*------------Components*/
import LeftNav from "../Navbars/LeftNav"
import Card from "./Card"
import GetPosts from "../Store/actions/posts.action"
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation----------------------------------------------------------------------------------------------------------*/
export default function Thread() { /*Exports to the Home page a Thread component...*/

    /*------------Data*/
    const postsData = useSelector(state => state.postsReducer) /*...that gets the posts data from the Store...*/
    const clientData = useSelector(state => state.clientReducer)
    const dispatch = useDispatch()

    const [loadedPosts, setLoadedPosts] = useState(true)
    const [count, setCount] = useState(5)

    /*------------Middlewares*/

    function loadMore() {
        if (window.innerHeight + document.documentElement.scrollTop + 1 > document.scrollingElement.scrollHeight) {
            setLoadedPosts(true)
        }
    }

    useEffect(() => {
        if (loadedPosts) {
            dispatch(GetPosts(count))
            setLoadedPosts(false)
            setCount(count + 5)
        }

        window.addEventListener('scroll', loadMore)
        return () => window.removeEventListener('scroll', loadMore)
    }, [loadedPosts, dispatch, count])

    /*------------Return*/
    return ( /*...then returns...*/
        <div className="thread-container">
            {clientData._id !== `${process.env.REACT_APP_ADMIN_ID}` && <LeftNav />} {/*...the LeftNav component...*/}
            <ul>
                {postsData?.length && postsData.map(post => { /*...and, for each post retrieved from the Store...*/
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