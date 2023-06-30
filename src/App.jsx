import './App.css';
import Header from './Components/Header';
import { BrowserRouter as Router } from 'react-router-dom';
import Footer from './Components/Footer';
import Routing from './Routes/RouteConfig';
import { useEffect, useState } from 'react';
import UserUtils from '../src/APICalls/UserServices';
import { ACCESS_TOKEN } from './APICalls/Constants';

function App() {

  const [authUser, setAuthUser] = useState({});
  const [isAuth, setAuth] = useState(false);
  const [isAdmin, setAdmin] = useState(false);

  useEffect(()=>{
    UserUtils.getCurrentUser()
    .then(response => {
      setAuthUser(response);
    }).catch(console.log);  
  },[]);

  useEffect(()=>{
    if (Object.keys(authUser).length !== 0 && authUser.constructor === Object){
      setAuth(true);
    }
  },[authUser, isAuth]);

  useEffect(()=>{
    if(isAuth){
      UserUtils.isUserAdmin().then(()=>{
       setAdmin(true); 
      })
    }
  },[isAuth, isAdmin]);

  function handleLogout(){
    localStorage.removeItem(ACCESS_TOKEN);
    this.setAuthUser({});
    this.setAuth(false);
    this.setAdmin(false);
  }
  
  return (
    <Router>
      <Header isAdmin={isAdmin} isAuth = {isAuth} authUser = {setAuthUser} handleLogout = {handleLogout} />
      <Routing isAdmin={isAdmin} isAuth = {isAuth} authUser = {authUser} setAuthUser ={setAuthUser}/>
      <Footer/>
    </Router>
  );
}

export default App;
