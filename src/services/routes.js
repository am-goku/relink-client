import { createBrowserRouter,  } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Signup from "../pages/Register/Signup";
import Varifyemail from "../pages/Login/Varifyemail";
import Error from "../pages/Error/Error";
import Test from "../pages/Test";
import adminRouter, { adminLoginRouter } from "./admin/routes";


const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <Error />,
        children: [
            {
                path: "/",
                element: <Home />
            },
        ]
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Signup />,
    },
    {
        path: "/forgot-password",
        element: <Varifyemail />,
    },


    adminRouter,
    adminLoginRouter,



    {
        path: "/test",
        element: <Test />
    }
]);


export default appRouter;