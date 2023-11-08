import AdminLogin from "../../pages/Admin/Login/AdminLogin";
import Error from "../../pages/Error/Error";
import Dashboard from "../../pages/Admin/Dashboard/Dashboard";
import Users from "../../pages/Admin/Usermanagement/Users";
import Admin from "../../pages/Admin/Admin";
import Test from "../../pages/Test";
import Posts from "../../pages/Admin/PostManagement/Posts";
import ReportPage from "../../pages/Admin/Reports/ReportPage";





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
      path:"/admin/posts",
      element: <Posts />
    },
    {
      path: "/admin/test",
      element: <Test />
    },
    {
      path:"/admin/reports",
      element: <ReportPage />
    }
  ]
};



export const adminLoginRouter = {
    path: "/admin/login",
    element: <AdminLogin />
}

export default adminRouter;
