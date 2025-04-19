import { useState } from 'react';
import {createBrowserRouter, RouterProvider, redirect} from "react-router-dom";
import AppContext from "./Contexts/AppContext";

import Navbar from './Components/Navbar/Navbar';
import Main from './Components/Main/Main';
import Footer from './Components/Footer/Footer';
import SignUp from './Components/Auth/SignUp';
import LogIn from './Components/Auth/LogIn';
import NotFoundPage from './Components/NotFoundPage';

export default function App(){
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [isProfileCollapsed, setIsProfileCollapsed] = useState(false);

  function toggleSidebar() {
    setIsSidebarCollapsed(prev => !prev);
  };
  function toggleProfile() {
    setIsProfileCollapsed(prev => !prev);
  };

  const router = createBrowserRouter([
    { path:  '/',
      element: 
        <>
          <Navbar />
          <Main />
          <Footer />
        </>
    },
    {
      path: '/signUp',
      element: <SignUp/>                
    },
    {
      path: '/logIn',
      element: <LogIn/>                
    },
    {
      path: "*",
      element: <NotFoundPage/>
    }
  ]);

  return ( 
    <AppContext.Provider value={{isProfileCollapsed, isSidebarCollapsed, toggleSidebar, toggleProfile}}>
      <RouterProvider router={router} />
    </AppContext.Provider>
  );
}