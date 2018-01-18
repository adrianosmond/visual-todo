import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { load, remove } from '../../actions/itemActions';
import { database } from '../../lib/db.js';
import './index.css';

class ManageItems extends Component {

  componentWillMount () {
    database.ref('items').once('value', (result) => {
      const allItems = result.val();
      let itemsArray = [];
      for (var key in allItems) {
        itemsArray.push(allItems[key]);
        itemsArray[itemsArray.length - 1].id=key;
      }
      this.props.load(itemsArray);
    });
  }

  render () {
    return (
      <div className="manage-items">
        <Link className="manage-items__item" to="/items/add">Add an item</Link>
        {this.props.items.length > 0 ? <Link className="manage-items__item" to="/items/new-list">Make a new list from these items</Link> : null}
        {this.props.items.map((item, idx) => {
          return (
            <Link className="manage-items__item" to={`/items/edit/${item.id}`} key={item.id} style={{
              backgroundImage: `url(${item.image})`
            }}>
              <span className="manage-items__item-name">{item.name}</span>
            </Link>
          );
        })}
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return state.allItems;
}

const mapDispatchToProps = (dispatch) => {
  return {
    load: (items) => dispatch(load(items)),
    remove: (id) => dispatch(remove(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageItems);
