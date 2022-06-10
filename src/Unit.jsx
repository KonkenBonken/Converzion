import React, { Component } from 'react';

class Unit extends Component {
  render() {
    const { name, unit, rootValue, setRoot, toRoot, fromRoot } = this.props;
    return (<input type='number' name={name} unit={unit}
              value={fromRoot(+rootValue)}
              onChange={({target})=>setRoot(+toRoot(target.value))}/>);
  }
}

export default Unit;