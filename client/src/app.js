import React from 'react';
import { render } from 'react-dom';
import Main from './components/Main';
import Home from './components/Home';
import ThreadList from "./components/ThreadList";
import { HashRouter, Route } from "react-router-dom";

window.onload = () => {
  render(
    <HashRouter>
      <div>
        <Route path="/" component={Main} />
        <Route exact path="/" component={Home} />
        <Route path="/read" component={ThreadList} />
        {/* <Route path="/write" component={ThreadForm} /> */}
      </div>
    </HashRouter>,
    document.getElementById('content-div')
  )
}
