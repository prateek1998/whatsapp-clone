import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import Login from './Login'
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import { useStateValue } from "./StateProvider";
function App() {
  const [{user}, dispatch] = useStateValue();

  return (
    <div className="app">
      {!user ? (
        <Login/>
      ) : (
        <div className="app_body">
          <Router>
            <Sidebar />
            <Switch>
              <Route path="/app/:groupId">
                <Chat />
              </Route>
              <Route path="/">
                <Chat />
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
