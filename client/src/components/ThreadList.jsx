import React, { Component } from "react"

export default class ThreadList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      threads: [
        {
          title: "Test",
          author: "Dan",
          text: "Testing testing testing",
          comments: [
            {
              author: "Also Dan",
              text: "A test comment.",
              comments: []
            },
            {
              author: "Still Dan",
              text: "Another test comment.",
              comments: []
            }
          ]
        },
        {
          title: "Test2",
          author: "Dan2",
          text: "Testing2 testing2 testing2",
          comments: [
            {
              author: "Dan2",
              text: "Testing testing still testing",
              comments: []
            }
          ]
        }
      ]
    }
  }

  render() {

    var counter = 0

    const threadDisplay = this.state.threads.map( thread => {
      return (
        <div id="thread-list-item" key={counter++}>
          <h3>{thread.title}</h3>
          <p>{thread.author}</p>
        </div>
      )
    })

    console.log(threadDisplay);

    return (
      <div id="thread-list">
        {threadDisplay}
      </div>
    )
  }


}
