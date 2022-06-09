import React, { Component } from 'react';
import Unit from './Unit';

class Group extends Component {
  constructor(props) {
    super(props);
    this.units = props.children;
    this.state = { rootValue: 0 };
    this.setRoot = this.setRoot.bind(this);
  }

  setRoot(rootValue) {
    this.setState({ rootValue });
  }

  render() {
    const elements = [];
    for (const { name, unit, fromRoot, toRoot } of this.units)
      elements.push(<Unit key={name} name={name} unit={unit} prev={elements[elements.length-1]} setRoot={this.setRoot} rootValue={this.state.rootValue} fromRoot={fromRoot} toRoot={toRoot}/>)

    return (<div className='group'>{elements}</div>);
  }
}

export default Group;