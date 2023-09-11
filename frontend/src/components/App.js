import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'; 


import "../style/App.css";
import "../formulaire/createAccount";
import MainNavigation from "../shared/Navigation/MainNavigation";
import createAccount from "../formulaire/createAccount";
import login from "../formulaire/login";


function App() {
 

  
  
  return (
    <Router>
    <MainNavigation />
      <switch>
      
      <Route path="/login" component={login} />
      <Route path="/createAccount" component={createAccount} />
      </switch>
    </Router>
  );
}

export default App;
