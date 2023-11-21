import { createBrowserRouter,  } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Signup from "../pages/Register/Signup";
import Varifyemail from "../pages/Login/Varifyemail";
import Error from "../pages/Error/Error";
import adminRouter, { adminLoginRouter } from "./admin/routes";
import UserProfile from "../pages/Profile/UserProfile";
import SinglePostPage from "../pages/Posts/SinglePostPage";
import Explore from "../pages/Explore/Explore";
import MessageBox from "../pages/Message/MessageBox";


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile/:username",
        element: <UserProfile />,
      },
      {
        path: "/post/:postId",
        element: <SinglePostPage />,
      },
      {
        path: "/explore",
        element: <Explore />
      },
      {
        path: "/message",
        element: <MessageBox />,
      },
    ],
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

]);


export default appRouter;