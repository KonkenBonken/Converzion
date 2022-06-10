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

  dataToEl(unitData, isRoot) {
    const { name, unit, fromRoot, toRoot } = unitData;
    return (<Unit key={name} name={name} unit={unit} fromRoot={fromRoot} toRoot={toRoot} isRoot={isRoot} setRoot={this.setRoot} rootValue={this.state.rootValue}/>);
  }

  render() {
    const elements = [];
    let isRoot = true;
    for (let unitData of this.props.children) {
      if (Array.isArray(unitData)) {
        const innerEls = unitData.map(unitData => this.dataToEl(unitData, isRoot));
        elements.push(<div className='innerGroup' key={unitData.map(u => u.unit).join('<')}>{innerEls}</div>)
      } else
        elements.push(this.dataToEl(unitData, isRoot))
      isRoot = false;
    }

    return (<div className='group'>{elements}</div>);
  }
}

export default Group;