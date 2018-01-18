import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { add, update, remove, load } from '../../actions/itemActions';
import { database } from '../../lib/db.js';
import './index.css';


class ItemForm extends Component {
  state = {
    id: null,
    image: null,
    name: "",
    done: false
  }

  componentWillMount() {
    //if we have an oldId prop, we're using the form to
    //edit rather than create, so lets grab the data and
    //fill the form
    if (this.props.oldId) {
      //if we've already got data in the store, lets use it
      if (this.props.items.length > 0) {
        this.findItemAndPrefillForm();
      //otherwise we'll go to the database to fill the store
      } else {
        database.ref('items').once('value', (result) => {
          const allItems = result.val();
          let itemsArray = [];
          for (var key in allItems) {
            itemsArray.push(allItems[key]);
            itemsArray[itemsArray.length - 1].id=key;
          }
          this.props.load(itemsArray);
          this.findItemAndPrefillForm();
        });
      }
    }
  }

  findItemAndPrefillForm() {
    //TODO: handle incorrect/missing this.props.oldId

    const data = this.props.items.find((item) => item.id === this.props.oldId);
    this.setState({
      id: data.id,
      image: data.image,
      name: data.name
    })
    this.drawImageToCanvas(data.image);
  }

  drawImageToCanvas(url, updateState = false) {
    const img = new Image();
		img.src = url;

		img.onload = () => {
			const scale=Math.max((500/img.width),(500/img.height));
      const context = this.canvas.getContext("2d");
			context.drawImage(
				img,
				0, 0, img.width, img.height,
				(500-img.width*scale)/2, (500-img.height*scale)/2, img.width*scale, img.height*scale
			);

      if (updateState) {
        this.setState({
          image: this.canvas.toDataURL("image/jpeg", 0.7)
        });
      }
		}
  }

  changePicture(e) {
		this.drawImageToCanvas(window.URL.createObjectURL(e.target.files[0]), true);
  }

  makeId(name) {
    let id = "";
    const nameLower = name.toLowerCase();
    for (let i=0; i<name.length; i++) {
      var char = nameLower.charCodeAt(i);
      if (char > 96  && char < 123) {
        id += nameLower[i];
      }
    }
    return id;
  }

  updateNameAndId(e) {
    const name = this.nameInput.value;
    const trimmedName = name.trim();
    if (trimmedName.length === 0) {
      this.setState({
        id: null,
        name: ""
      })
    } else {
      this.setState({
        id: this.makeId(trimmedName),
        name: name
      })
    }
  }

  cancel() {
    this.setState({
      done: true
    })
  }

  saveForm () {
    if (!this.state.image) {
      alert("Please choose an image");
      return;
    }

    if (this.state.name.length === 0) {
      alert("Please give the item a name");
      return;
    }

    //TODO: Ensure IDs are unique when adding OR editing

    if (this.props.oldId) {
      //updating an item

      //if we haven't changed the name (and therefore the ID)
      //we can do it with an update.
      if (this.state.id === this.props.oldId) {
        this.props.update(this.state.id, this.state.name.trim(), this.state.image);

      //otherwise we'll just remove the old and add the new
      } else {
        this.props.remove(this.props.oldId);
        this.props.add(this.state.id, this.state.name.trim(), this.state.image);
      }
    } else {
      //adding a new item
      this.props.add(this.state.id, this.state.name, this.state.image);
    }
    setTimeout(() => {
      this.setState({
        done: true
      })
    }, 0);
  }

  delete () {
    if (!this.props.oldId) return;
    if (window.confirm("Are you sure you want to delete this item?")) {
      this.props.remove(this.props.oldId);

      setTimeout(() => {
        this.setState({
          done: true
        })
      }, 0);
    }

  }

  render () {
    return (
      <div className="item-form">
      	<canvas className="item-form__preview" ref={(el) => { this.canvas = el; }} width="500px" height="500px"></canvas>
      	<div className="item-form__controls">
      		<label className="item-form__picture">
      			<input className="item-form__picture-input" type="file" name="picture" onChange={this.changePicture.bind(this)} accept="image/gif, image/png, image/jpeg, image/bmp, image/webp" />
      			<span className="item-form__picture-fake-button"></span>
      		</label>
      		<label>
      			<div className="item-form__caption-label">Name:</div>
      			<input className="item-form__name" type="text" name="caption" ref={(el) => { this.nameInput = el; }} value={this.state.name} onChange={this.updateNameAndId.bind(this)} />
      		</label>
          <div className="item-form__buttons">
        		<button className="item-form__button" onClick={this.cancel.bind(this)}>Cancel</button>
        		<button className="item-form__button" onClick={this.saveForm.bind(this)}>Save</button>
        		{ this.props.oldId ? <button className="item-form__button" onClick={this.delete.bind(this)}>Delete</button> : null }
          </div>
      	</div>
        { this.state.done ?  <Redirect to="/items/"/> : null }
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
    add: (id, name, image) => dispatch(add(id, name, image)),
    remove: (id) => dispatch(remove(id)),
    update: (id, name, image) => dispatch(update(id, name, image))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemForm);
