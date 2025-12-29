import { ToastContainer } from 'react-toastify';
import './App.css'
import Home_page from './home/home.jsx';
import Login_page from './auth/login.jsx';
import Register_page from './auth/register';
import Base_page from './basepage/base';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from './restrict';
import Searchbar from './search/search_user';
import UserProfile from './profile/profile';
import Notfi from './notfication/notfication';
import Chat from './chat/cHat';
import { ProfileScreen } from './profile_edit/profile_edit';
import WebSocketProvider from './websocketprovider/websocket';
import Register_2_page from './auth/register_2';

import RegisterScreen from './auth/register_form/regi';

function App() {


  return (
      <>
      <ToastContainer position="top-right" autoClose={3000} />
    <BrowserRouter>
          <Routes>
              
            <Route path='/' element={<Base_page/>} > </Route>
            <Route path="/login" element={<Login_page />} />
            {/* <Route path="/register" element={<Register_2_page />} /> */}
            <Route path="/register" element={<RegisterScreen />} />

          </Routes>
          
                <Routes>
                  
                 <Route
                    path="/home/*"
                    element={
                      <ProtectedRoute>
                        <WebSocketProvider>
                          <Routes>
                            <Route path="" element={<Home_page />} />
                            <Route path="search" element={<Searchbar />} />
                            <Route path="search/user/:id" element={<UserProfile />} />
                            <Route path="notfi" element={<Notfi />} />
                            <Route path="chat/:id" element={<Chat />} />
                            <Route path="prof" element={<ProfileScreen />} />
                          </Routes>
                        </WebSocketProvider>
                      </ProtectedRoute>
                    }
/>

                </Routes>
          
    </BrowserRouter>
    </>
  )
}

export default App;
