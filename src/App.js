import "./App.css";
import React, {useEffect} from 'react' 
import { Route, Switch } from 'react-router-dom'
import { Home } from "./containers/Home";
import { Signin } from "./containers/Signin"
import { Signup } from "./containers/Signup";
import PrivateRoute from './components/HOC/PrivateRoute'
import { useDispatch, useSelector } from "react-redux";
import {isUserLoggedIn} from './actions'
import { Film } from "./containers/Films";
import InfoFilm from './containers/Films/InfoFilm'
import { Category } from "./containers/Categories";
import { Actor } from "./containers/Actors";
import { Country } from "./containers/Countries";

function App() {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  useEffect(()=>{
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn())
    }
  }, [])

  return (
    <div className="App">
        <Switch>
          <PrivateRoute path='/' exact component={Home}/>
          <PrivateRoute path='/films' exact component={Film}/>
          <PrivateRoute path='/films/:id' component={InfoFilm}/>
          {/* <PrivateRoute path="/edit/:id" component={EditFilm} /> */}
          <PrivateRoute path='/categories' exact component={Category}/>
          <PrivateRoute path='/actors' exact component={Actor}/>
          <PrivateRoute path='/countries' exact component={Country}/>
          <Route path='/signin'  component={Signin}/>
          <Route path='/signup' component={Signup}/>
        </Switch>
    </div>
  );
}

export default App;
