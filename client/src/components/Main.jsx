import React, { Component } from 'react'
import { Link } from "react-router-dom";

class Main extends Component {

  render() {
    return (
      <div id="main-div">
          <div id="header-div">
            <a id="write" href="/write">start a thread</a>
            <a id="title" href="/">thread</a>
            {/* <a id="read" href="/read">view threads</a> */}
            <p id="read"><Link to="read">view threads</Link></p>
          </div>
          <div id="content-div">

          </div>
      </div>
    )
  }



}


export default Main
