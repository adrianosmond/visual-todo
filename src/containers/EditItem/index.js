import React, { Component } from 'react';
import ItemForm from '../../components/ItemForm';
import './index.css';

class EditItem extends Component {
  render () {
    return (
      <ItemForm oldId={this.props.match.params.itemId} />
    )
  }
}

export default EditItem;
