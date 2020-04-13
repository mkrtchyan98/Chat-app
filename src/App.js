import React,{useState,useEffect} from 'react';
import './App.css';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from './pages/Home';
import Chat from './pages/Chat';
import Signup from './pages/Signup';
import Login from './pages/Login';
import {auth} from './services/firebase';

function App() {
  const [authenticated,setAuthenticated] = useState(false)
  const [loading,setLoading] = useState(true)

  useEffect(() =>{
    auth().onAuthStateChanged((user) => {
      if(user) {
        setAuthenticated(true)
        setLoading(false)
      }
      else {
        setAuthenticated(false)
        setLoading(false)
      }
    })
  })
  return  loading === true ? null :(
    <div className="App">   
      <Router>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <PrivateRoute path="/chat" authenticated={authenticated} component={Chat}></PrivateRoute>
        <PublicRoute path="/signup" authenticated={authenticated} component={Signup}></PublicRoute>
        <PublicRoute path="/login" authenticated={authenticated} component={Login}></PublicRoute>
      </Switch>
    </Router>
    </div>
  );
}



function PublicRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => authenticated === false
        ? <Component {...props} />
        : <Redirect to='/chat' />}
    />
  )
}


function PrivateRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => authenticated === true
        ? <Component {...props} />
        : <Redirect to='/login' />}
    />
  )
}





export default App;



