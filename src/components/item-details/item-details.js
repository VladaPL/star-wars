import React, { Component } from "react";
import SwapiService from "../../services";
import ErrorButton from "../error-button";
import ErrorIndicator from "../error-indicator/error-indicator";
import Spinner from "../spinner";

import "./item-details.css";

const Record = ({ item, field, label }) => {
    return (
      <li className="list-group-item">
        <span className="term">{label}</span>
        <span>{ item[field] }</span>
      </li>
    );
  };
  
  export {Record};



export default class ItemDetails extends Component {
    swapiService = new SwapiService();

    state = {
        item: null,
        image: null,
        //loading: true,
    };

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        // Всегда проверяем через условие обновилось ли значение, воизбежание бесконечного цикла
        if (this.props.itemId !== prevProps.itemId) {
            this.updatePerson();
        }
    }

    // onPersonLoaded = (item) => {
    //     this.setState({
    //         item,
    //         loading: false,
    //         error: false,
    //     });
    // };

    // onError = (err) => {
    //     this.setState({
    //         error: true,
    //         loading: false,
    //     });
    // };

    updateItem() {
        const { itemId, getData, getImageUrl } = this.props;
        if (!itemId) {
            return;
        }

        getData(itemId).then((item) => {
            this.setState({
                item,
                image: getImageUrl(item),
            });
        });
    }

    render() {

        const { item, image } = this.state;
        if (!item) {
          return <span>Select a item from a list</span>;
        }
    
        const { id, name, gender,
                  birthYear, eyeColor } = item;
    
        return (
          <div className="item-details card">
            <img className="item-image"
              src={image}
              alt="item"/>
    
            <div className="card-body">
              <h4>{name}</h4>
              <ul className="list-group list-group-flush">
                {
                  React.Children.map(this.props.children, (child) => {
                    return React.cloneElement(child, { item });
                  })
                  // Здесь мы прошлись по всем детям и клонировали каждого, добавив к каждой копии элемента свойство item.
                }
              </ul>
              <ErrorButton />
            </div>
          </div>
        );
      }
    }