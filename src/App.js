import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import Profile from './components/Profile';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/profile" component={Profile} />
        </Switch>
          
      </BrowserRouter>
      
    </div>
  );
}

export default App;
