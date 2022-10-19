/*Imports------------------------------------------------------------------------------------------------------------*/
/*------------Redux, React & Axios modules*/
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import axios from "axios"

/*------------Actions*/
import GetClient from "./components/Store/actions/client.action"

/*------------Components*/
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbars/Navbar"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation----------------------------------------------------------------------------------------------------------*/
export default function App() { /*Exports to the Root an App component...*/

  /*------------Data*/
  const clientData = useSelector(state => state.clientReducer)

  /*------------Middleware*/
  const dispatch = useDispatch()

  useEffect(() => { /*...that runs a useEffect hook...*/
    axios.get('http://localhost:5000/token', { withCredentials: true }) /*...running a GET (Token) request...*/

      .then(res => {
        axios.get(`http://localhost:5000/api/user/${res.data}`, { withCredentials: true }) /*...then a GET (One user) request using the data retrieved from the token...*/

          .then(res => { dispatch(GetClient(res.data._id)) }) /*...before running a Get client action*/
          .catch(error => console.log(error))
      })
      .catch(error => console.log(error))
  }, [dispatch])

  /*------------Return*/
  return ( /*The App component returns...*/
    <BrowserRouter> {/*...a Router...*/}
      <Navbar /> {/*...running the Navbar component on all routes*/}
      <Routes>
        <Route path="/home" element={<Home />} />
        {clientData._id !== `${process.env.REACT_APP_ADMIN_ID}` && <Route path="/profile" element={<Profile />} />}
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}
/*-------------------------------------------------------------------------------------------------------------------*/