import './App.css';
import { Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Header from './components/Header';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Signup from './pages/Signup';
import { Chat } from './pages/Chat';
import { useAuth } from './context/AuthContext';


function App() {
  const auth= useAuth()
  return (
    <>
       <Header/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          {auth?.isLoggedIn && auth.user && (
          <Route path="/chat" element={<Chat />} />
        )}
          <Route path='*' element={<NotFound/>}/>

        </Routes> 

       
    </>
  );
}

export default App;
