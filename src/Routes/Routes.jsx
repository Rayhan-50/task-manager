
import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import AddTask from "../pages/AddTask/AddTask";
import PrivateRoute from "./PrivateRoute";



 export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: "/",
            element:<PrivateRoute><Home></Home></PrivateRoute>,
        },
  
        {
          path:'login',
          element: <Login></Login>
        },
        {
          path:'signup',
          element: <SignUp></SignUp>
        },
        {
          path:'add',
          element:<PrivateRoute><AddTask></AddTask></PrivateRoute>
        },
     
        
      ]
    },
   
  ]);
  
  
  