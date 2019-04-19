import React, { Component, Fragment } from "react";

class Todolist extends Component {
  render() {
    return (
      <Fragment><div>
        <input></input><button>提交</button>
        <ul>
          <li>学习 react</li>
          <li>制作网页</li>
        </ul>
      </div></Fragment>
    )
  }
}

export default Todolist;