/*Imports------------------------------------------------------------------------------------------------------------*/
/*------------Modules*/
import { useEffect, useState } from "react" /*Imports the useState() and useEffect() hooks*/
import { BrowserRouter, Routes, Route } from "react-router-dom" /*Imports BrowserRouter*/
import axios from "axios" /*Imports Axios*/

/*------------Pages*/
import Home from "./pages/Home" /*Imports the Home page*/
import Trendings from "./pages/Trendings" /*Imports the Trendings page*/
import Profile from "./pages/Profile" /*Imports the Profile page*/

/*------------Components*/
import { UserDataContext } from "./components/AppContext" /*Imports the Context*/
import Navbar from "./components/Navbars/Navbar" /*Imports the Navbar component*/
/*-------------------------------------------------------------------------------------------------------------------*/


/*Operation----------------------------------------------------------------------------------------------------------*/
function App() { /*Runs an App() function...*/

  /*------------Calls*/
  const [userData, setUserData] = useState(null) /*...that calls the useState() hook...*/

  /*------------Middleware*/
  useEffect(() => { /*...and the useEffect() hook...*/

    axios({ /*...that runs itself an Axios GET method on the backend "/token" route*/
      method: "get",
      url: `http://localhost:5000/token`,
      withCredentials: true
    })
      .then(res => {
        axios({ /*If there is a token, it then runs another Axios GET method on the backend "/api/user/:id" route...*/
          method: "get",
          url: `http://localhost:5000/api/user/${res.data}`,
          withCredentials: true
        })
          .then(res => {
            return setUserData(res.data) /*...before setting the useState() hook with the retrieved user data*/
          })
          .catch(error => console.log(error))
      })
      .catch(() => console.log("Vous n'êtes pas authentifié(e) !")) /*If there is no token, it returns an error message*/

  }, [userData])

  /*------------Return*/
  return ( /*The App() function finally returns...*/
    <UserDataContext.Provider value={userData}> {/*...a Context that stores the user data...*/}
      <BrowserRouter> {/*...and a browser router...*/}
        <Navbar /> {/*...that runs the Navbar component on all routes...*/}
        <Routes>
          <Route path="/home" element={<Home />} /> {/*...the Home page on the "/home" route...*/}
          <Route path="/trendings" element={<Trendings />} /> {/*...the Trendings page on the "/trendings" route...*/}
          <Route path="/profile" element={<Profile />} /> {/*...the Profile page on the "/profile" route...*/}
          <Route path="*" element={<Home />} /> {/*...and the Home page on any other route...*/}
        </Routes>
      </BrowserRouter>
    </UserDataContext.Provider>
  )
}
/*-------------------------------------------------------------------------------------------------------------------*/


/*Export-------------------------------------------------------------------------------------------------------------*/
export default App /*Exports the App component to the "index.js" file
/*-------------------------------------------------------------------------------------------------------------------*/