import React, { Component } from 'react';

class Unit extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (<input type='number' name={this.props.name} unit={this.props.unit}
              value={this.props.fromRoot(this.props.rootValue)}
              onChange={({target})=>this.props.setRoot(this.props.toRoot(target.value))}/>);
  }
}

export default Unit;