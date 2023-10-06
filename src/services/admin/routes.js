import AdminLogin from "../../pages/Admin/Login/AdminLogin";
import Error from "../../pages/Error/Error";
import Dashboard from "../../pages/Admin/Dashboard/Dashboard";
import Users from "../../pages/Admin/Usermanagement/Users";
import Admin from "../../pages/Admin/Admin";
import Test from "../../pages/Test";





export const adminRouter = {
  path: "/admin",
  element: <Admin />,
  errorElement: <Error />,
  children: [
    {
      path:"/admin",
      element: <Dashboard />
    },
    {
      path:"/admin/users",
      element: <Users />
    },
    {
      path: "/admin/test",
      element: <Test />
    }
  ]
};



export const adminLoginRouter = {
    path: "/admin/login",
    element: <AdminLogin />
}

export default adminRouter;
