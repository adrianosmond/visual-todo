import React from 'react';
import './index.css';

const ItemTile = ({ item, clickHandler, children }) => (
  <div className="tile-grid__item" style={{backgroundImage: `url(${item.image})`}} onClick={clickHandler}>
    <span className="tile-grid__item-name">{item.name}</span>
    {children}
  </div>
)

export default ItemTile;
