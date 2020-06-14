import React from "react";
import "./App.css";
import Journey from "./pages/Journey";
import Live from "./pages/Live";
import Detail from "./pages/Detail";
import { Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Route path="/" exact component={Journey}></Route>
      <Route path="/live" component={Live}></Route>
      <Route path="/detail" component={Detail}></Route>
    </div>
  );
}

export default App;
