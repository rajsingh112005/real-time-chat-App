import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { logout, setOnlineUser, setUser, setSocketConnection } from '../redux/UserSlice';
import Sidebar from '../components/Sidebar';
import io from 'socket.io-client';
import logo from '../assets/logo.png'
const Home = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  console.log('user', user);

  const fetchUserDetails = async () => {
    try {
      const URL = `${import.meta.env.VITE_APP_BACKEND_URL}/api/user-details`;
      const response = await axios({
        url: URL,
        withCredentials: true
      });

      dispatch(setUser(response.data.data));

      if (response.data.data.logout) {
        dispatch(logout());
        navigate("/email");
      }
      console.log("current user Details", response);
    } catch (error) {
      console.error("Error fetching user details:", error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        console.log('Authentication failed during user details fetch, logging out.');
        dispatch(logout());
        navigate("/email");
      }
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  // Socket connection
  useEffect(() => {
    if (user._id) {
      const socketConnection = io(import.meta.env.VITE_APP_BACKEND_URL, {
        auth: {
          token: localStorage.getItem('token')
        },
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
      });

      socketConnection.on('connect', () => {
        console.log('Socket Connected:', socketConnection.id);
        dispatch(setSocketConnection(socketConnection));
      });

      socketConnection.on('disconnect', (reason) => {
        console.log('Socket Disconnected:', reason);
      });

      socketConnection.on('connect_error', (error) => {
        console.error('Socket Connection Error:', error.message);
        if (error.message === 'Unauthorized' && localStorage.getItem('token')) {
          console.log('Authentication failed for socket, please log in again.');
          dispatch(logout());
          localStorage.clear();
          navigate('/email');
        }
      });

      socketConnection.on('onlineUser', (data) => {
        console.log('Online Users Data:', data);
        dispatch(setOnlineUser(data));
      });

      return () => {
        socketConnection.disconnect();
      };
    }
  }, [user._id, dispatch, navigate]);

  const basePath = location.pathname === '/';

  return (
    <div className='flex h-screen max-h-screen '>
        {/* Sidebar */}
        <section className={`bg-white border-r border-slate-200 ${!basePath && "hidden"} lg:block h-full w-80`}>
           <Sidebar/>
        </section>

        {/* Main content area */}
        <section className='flex-1 h-full bg-gray-900'>
          {/* Message component when not at base path */}
          <div className={`${basePath && "hidden"} h-full`}>
            <Outlet/>
          </div>

          {/* Logo section when at base path */}
          <div className={`${!basePath ? "hidden" : "flex"} justify-center items-center h-full flex-col gap-2`}>
            <div>
              <img
                src={logo}
                width={250}
                alt='logo'
              />
            </div>
            <p className='text-lg mt-2 text-gray-300'>Select user to send message</p>
          </div>
        </section>
    </div>

  );
};

export default Home;