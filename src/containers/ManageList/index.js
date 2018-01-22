import React, { Component } from 'react';
import { connect } from 'react-redux';
import ItemTile from '../../components/ItemTile';
import { loadItems } from '../../actions/itemActions';
import { loadList, add, remove, moveUp, moveDown, clear } from '../../actions/listActions';
import { database } from '../../lib/db.js';
import { LIST_KEY } from '../../lib/constants.js';
import './index.css';

class ManageList extends Component {
  state = {
    listLoaded: false
  }

  componentWillMount() {
    database.ref('items').once('value', (result) => {
      const allItems = result.val();
      let itemsArray = [];
      for (var key in allItems) {
        itemsArray.push(allItems[key]);
        itemsArray[itemsArray.length - 1].id=key;
      }
      this.props.loadItems(itemsArray);
    });
    let list = window.localStorage.getItem(LIST_KEY);
    try {
      if (!list) {
        throw new Error("No list found");
      } else {
        list = JSON.parse(list);
        this.props.loadList(list)
      }
    } catch (error) {
      window.localStorage.setItem(LIST_KEY, "[]");
    }

    this.setState({
      listLoaded: true
    })
  }

  componentWillReceiveProps(newProps) {
    if (this.state.listLoaded) {
      window.localStorage.setItem(LIST_KEY, JSON.stringify(newProps.list))
    }
  }

  render () {
    return (
      <div>
        <h1>The list</h1>
        <ul className="tile-grid">
        {this.props.list.map((item, idx) => <li key={idx}>
          <ItemTile item={item}>
            <button className="tile-grid__item-button tile-grid__item-button--prev" disabled={ idx === 0 ? "disabled" : false } onClick={this.props.moveUp.bind(this, idx)}>&lt;</button>
            <button className="tile-grid__item-button tile-grid__item-button--next" disabled={ idx === this.props.list.length - 1 ? "disabled" : false } onClick={this.props.moveDown.bind(this, idx)}>&gt;</button>
            <button className="tile-grid__item-button tile-grid__item-button--close" onClick={ this.props.remove.bind(this, idx) }>&times;</button>
          </ItemTile>
        </li>)}
        {this.props.list.length > 0 ? <li><button onClick={() => {
          if (window.confirm("Are you sure you want to empty the list?")) {
            this.props.clear()
          }
        }}>Empty the list</button>
        </li> : null }
        </ul>
        <h2>The Items</h2>
        <div className="tile-grid">
          {this.props.items.map((item, idx) => {
            return (
              <ItemTile item={item} key={idx} clickHandler={this.props.add.bind(this, item)}/>
            );
          })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { list: state.manageList.list, items: state.allItems.items };
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadItems: (items) => dispatch(loadItems(items)),
    loadList: (list) => dispatch(loadList(list)),
    add: (item) => dispatch(add(item)),
    remove: (index) => dispatch(remove(index)),
    moveUp: (index) => dispatch(moveUp(index)),
    moveDown: (index) => dispatch(moveDown(index)),
    clear: () => dispatch(clear())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageList);
