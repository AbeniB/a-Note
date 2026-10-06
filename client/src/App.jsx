import { useContext, useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom';
import AppContext from './Contexts/AppContext';
import { api } from './api';

import Navbar from './Components/Navbar/Navbar';
import Main from './Components/Main/Main';
import Footer from './Components/Footer/Footer';
import SignUp from './Components/Auth/SignUp';
import LogIn from './Components/Auth/LogIn';
import NotFoundPage from './Components/NotFoundPage';
import Home from './Components/Home/Home';

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { setUser } = useContext(AppContext);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    api
      .get('/api/session')
      .then(({ data }) => {
        if (!isMounted) return;

        if (!data.authenticated) {
          navigate('/login', { replace: true });
          return;
        }

        setUser(data.user);
        setIsReady(true);
      })
      .catch(() => {
        if (isMounted) {
          navigate('/login', { replace: true });
        }
      });

    return () => {
      isMounted = false;
    };
  }, [navigate, setUser]);

  return isReady ? children : null;
}

function PublicRoute({ children }) {
  const navigate = useNavigate();
  const { setUser } = useContext(AppContext);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    api
      .get('/api/session')
      .then(({ data }) => {
        if (!isMounted) return;

        if (data.authenticated) {
          setUser(data.user);
          navigate('/dashboard', { replace: true });
          return;
        }

        setIsReady(true);
      })
      .catch(() => {
        if (isMounted) {
          setIsReady(true);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [navigate, setUser]);

  return isReady ? children : null;
}

export default function App() {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [isProfileCollapsed, setIsProfileCollapsed] = useState(false);

  function toggleSidebar() {
    setIsSidebarCollapsed((prev) => !prev);
  }

  function toggleProfile() {
    setIsProfileCollapsed((prev) => !prev);
  }

  function toggleDarkMode() {
    setDarkMode((prev) => !prev);
  }

  async function logout() {
    try {
      await api.post('/api/logout');
    } finally {
      setUser(null);
    }
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: <PublicRoute><Home /></PublicRoute>
    },
    {
      path: '/dashboard',
      element: (
        <ProtectedRoute>
          <>
            <Navbar />
            <Main />
            <Footer />
          </>
        </ProtectedRoute>
      )
    },
    {
      path: '/signup',
      element: <PublicRoute><SignUp /></PublicRoute>
    },
    {
      path: '/login',
      element: <PublicRoute><LogIn /></PublicRoute>
    },
    {
      path: '*',
      element: <NotFoundPage />
    }
  ]);

  return (
    <AppContext.Provider value={{ user, setUser, darkMode, toggleDarkMode, isProfileCollapsed, isSidebarCollapsed, toggleSidebar, toggleProfile, logout }}>
      <div className={`app-shell ${darkMode ? 'theme-dark' : 'theme-light'}`}>
        <RouterProvider router={router} />
      </div>
    </AppContext.Provider>
  );
}