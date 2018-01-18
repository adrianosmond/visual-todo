import React, { Component } from 'react';
import LastItem from '../LastItem';

import './index.css';

const itemSize = 65;
const itemPadding = 5;
const totalHeight = itemSize + (2 * itemPadding);

class PlayList extends Component {
  state = {
    listTransformation: ""
  }

  componentDidMount() {
    this.updateTransform(this.props);
  }

  updateTransform (props) {
    this.setState({
      listTransformation: this.calculateTransform(props)
    })
  }

  calculateTransform (props) {
    const scaleRatio = window.innerWidth / this.items.offsetWidth;
		const yOffset = (totalHeight - (totalHeight * scaleRatio)) / 2;
    if (props.showingOverview) {
      return "translateX(0) translateY(" + yOffset + "vmin) scale(" + scaleRatio + ")";
    } else {
      const translate = itemSize * props.currentItem * -1;
      return "translate(" + translate + "vmin)";
    }
  }

  componentWillReceiveProps(nextProps) {
    this.updateTransform(nextProps);
  }

  render () {
    return (
      <ul className="items" style={{
        width: (((this.props.items.length + 1) * itemSize) + (2 * itemPadding)) + "vmin",
        transform: this.state.listTransformation
      }} ref={(el) => { this.items = el;}}>
        {this.props.items.map((item, idx) => {
          return (
            <li className={`items__item ${idx === this.props.currentItem ? 'items__item--current' : ''}`} style={{backgroundImage: `url(${item.image})`}} key={idx}>
          		<div className="items__item-name">{item.name}</div>
          	</li>
          )
        })}
      	<LastItem />
      </ul>
    )
  }
}

export default PlayList;
