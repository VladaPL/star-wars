import React from 'react';

import { withData } from '../hoc-helpers';
import SwapiService from "../../services/index";
import './item-list.css';

const ItemList = (props) => {

  const { data, onItemSelected, renderItem} = props;

  const items = data.map((item) => {
    const { id } = item;
    const label = renderItem(item);

    return (
      <li className="list-group-item"
          key={id}
          onClick={() => onItemSelected(id)}>
        {label}
      </li>
    );
  });

  return (
    <ul className="item-list list-group">
      {items}
    </ul>
  );
};

const { getAllPeople } = new SwapiService();

export default withData(ItemList, getAllPeople);
