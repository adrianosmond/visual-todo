import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ItemTile from '../../components/ItemTile';
import { loadItems, remove } from '../../actions/itemActions';
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
      this.props.loadItems(itemsArray);
    });
  }

  render () {
    return (
      <div className="tile-grid">
        <Link className="tile-grid__item" to="/items/add">Add an item</Link>
        {this.props.items.length > 0 ? <Link className="tile-grid__item" to="/items/manage-list">Make a new list from these items</Link> : null}
        {this.props.items.map((item, idx) => {
          return (
            <Link to={`/items/edit/${item.id}`} key={item.id}>
              <ItemTile item={item} />
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
    loadItems: (items) => dispatch(loadItems(items)),
    remove: (id) => dispatch(remove(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageItems);
