import React from "react";
import { BrowserRouter as Router,Routes,Route} from "react-router-dom";

//pages
import Login from "./pages/Login/Login";
import Signup from "./pages/Register/Signup";
import Varifyemail from "./pages/Login/Varifyemail";
import Home from "./pages/Home";


function App() {

  return (
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Signup />} />
              <Route path="/forgot-password" element={<Varifyemail />}></Route>
            </Routes>
          </Router>
  );
}

export default App;
