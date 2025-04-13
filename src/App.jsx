import { useState } from 'react';

import Navbar from './Components/Navbar';
import Main from './Components/Main';
import Footer from './Components/Footer';

export default function App(){
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [isProfileCollapsed, setIsProfileCollapsed] = useState(true);

  function toggleSidebar() {
    setIsSidebarCollapsed(prev => !prev);
  };
  function toggleProfile() {
    setIsProfileCollapsed(prev => !prev);
  };

  const nav_prop = {
    isProfileCollapsed: isProfileCollapsed,
    toggleSidebar: toggleSidebar,
    toggleProfile: toggleProfile
  }

  const main_prop = {
    isSidebarCollapsed: isSidebarCollapsed
  }

  return(
    <>
      <Navbar nav_prop={nav_prop} />
      <Main main_prop={main_prop} />
      <Footer />
    </>
  );
}