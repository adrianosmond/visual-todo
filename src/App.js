import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Play from './containers/Play';
import ManageItems from './containers/ManageItems';
import EditItem from './containers/EditItem';
import AddItem from './containers/AddItem';
import ManageList from './containers/ManageList';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={Play}/>
          <Route exact path='/items/' component={ManageItems}/>
          <Route path='/items/edit/:itemId' component={EditItem}/>
          <Route exact path='/items/add/' component={AddItem}/>
          <Route exact path='/items/manage-list' component={ManageList}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
