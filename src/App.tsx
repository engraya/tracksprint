import { useEffect, useCallback, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Sprints from './pages/Sprints';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import { supabase } from './lib/supabase';
import { loginUser } from './store/reducers/auth';
import { RootState } from './store';
import Tasks from './pages/Tasks';
import { logoutUser } from './store/reducers/auth';

function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);

  const syncAuthState = useCallback(async () => {
    const { data: { session } } = await supabase.auth.getSession();
    const user = session?.user;

    if (user && !currentUser) {
      dispatch(
        loginUser({
          id: user.id,
          email: user.email ?? '',
          name: user.user_metadata?.name ?? '',
        })
      );
    }
  }, [dispatch, currentUser]);

  useEffect(() => {
    syncAuthState();
  
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      const user = session?.user;
  
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        if (user) {
          dispatch(
            loginUser({
              id: user.id,
              email: user.email ?? '',
              name: user.user_metadata?.name ?? '',
            })
          );
        }
      }
  
      if (event === 'SIGNED_OUT') {
        dispatch(logoutUser());
      }
    });
  
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [syncAuthState, dispatch]);

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            {/* Public Routes */}
            <Route element={<PublicRoute />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>

            {/* Private Routes */}
            <Route element={<PrivateRoute />}>
              <Route path="sprints" element={<Sprints />} />
              <Route path="tasks" element={<Tasks />} />
            </Route>

            {/* Home Route */}
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </Suspense>

      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
