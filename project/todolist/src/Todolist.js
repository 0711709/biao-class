import React, { Component, Fragment } from "react";

class Todolist extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      list: [],
    }
  }

  render() {
    return (
      <Fragment>
        <div>
          <input
            value={this.state.inputValue}
            onChange = {this.handleInputChange.bind(this)}
          />
          <button>提交</button>
          <ul>
            <li>学习 react</li>
            <li>制作网页</li>
          </ul>
        </div>
      </Fragment>
    )
  }

  handleInputChange(e){
    // console.log(this)
    // this.state.inputValue = e.target.value;
    this.setState({
      inputValue: e.target.value,
    })
  }

}

export default Todolist;