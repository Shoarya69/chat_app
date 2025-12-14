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
function App() {


  return (
      <>
      <ToastContainer position="top-right" autoClose={3000} />
    <BrowserRouter>
          <Routes>
            <Route path='/' element={<Base_page/>} > </Route>
            <Route path="/home" element={
              <ProtectedRoute>
              <Home_page />
              </ProtectedRoute>
              } />
              <Route path='/search' element={
                <ProtectedRoute>
                <Searchbar/>
                </ProtectedRoute>
                } />
            <Route path="/login" element={<Login_page />} />
            <Route path="/register" element={<Register_page />} />
            <Route path="/user/:id" element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
              } />
           <Route path='/notfi' element={
                <ProtectedRoute>
                  <Notfi/>
                </ProtectedRoute>
           } />
           <Route path='home/chat/:id' element={
                <ProtectedRoute>
                  <Chat/>
                  
                </ProtectedRoute>
           } />
          </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
