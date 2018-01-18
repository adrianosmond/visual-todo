import React, { Component } from 'react';
import { connect } from 'react-redux';
import { load } from '../../actions/itemActions';
import { add, remove, moveUp, moveDown } from '../../actions/listActions';
import { database } from '../../lib/db.js';
import './index.css';

class ManageList extends Component {
  render () {
    return (
      <div>
        ManageList
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return state.manageList;
}

const mapDispatchToProps = (dispatch) => {
  return {
    load: (items) => dispatch(load(items)),
    add: (id) => dispatch(load(id)),
    remove: (id) => dispatch(remove(id)),
    moveUp: (id) => dispatch(moveUp(id)),
    moveDown: (id) => dispatch(moveDown(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageList);
