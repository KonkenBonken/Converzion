import React, { Component } from 'react';
import Unit from './Unit';

class Group extends Component {
  constructor(props) {
    super(props);
    this.state = { rootValue: 0 };
    this.setRoot = this.setRoot.bind(this);
    this.dataToEl = this.dataToEl.bind(this);
  }

  setRoot(rootValue) {
    this.setState({ rootValue });
  }

  dataToEl(unitData) {
    return (<Unit {...unitData} key={name} setRoot={this.setRoot} rootValue={this.state.rootValue}/>);
  }

  render() {
    const elements = [];
    this.props.children.forEach((unitData, i) => {
      if (typeof unitData === 'string') {
        if (i === 0) elements.push(<h3>{unitData}</h3>)
        else elements.push(<h4>{unitData}</h4>)
      } else
        elements.push(this.dataToEl(unitData))
    });

    return (<div className='group'>{elements}</div>);
  }
}

export default Group;