import React, { Component } from "react";
import SwapiService from "../../services";
import ErrorButton from "../error-button";
import ErrorIndicator from "../error-indicator/error-indicator";
import Spinner from "../spinner";

import "./item-details.css";

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
        const { item, loading, error, image } = this.state;

        if (!item) {
            return <span> Select an item from a list</span>;
        }

        const hasData = !(loading || error); // Если не загрузка и не ошибка, то контент

        const errorMessage = error ? <ErrorIndicator /> : null;
        const spinner = loading ? <Spinner /> : null;
        // TODO: Spinner не отображается при смене персонажа по клику на список
        const content = hasData ? <PersonView item={item} image={image} /> : null;

        return (
            <div className="item-details card">
                {errorMessage}
                {spinner}
                {content}
            </div>
        );
    }
}

const PersonView = ({ item, image }) => {
    const { name, gender, birthYear, eyeColor } = item;

    return (
        <React.Fragment>
            <img
                className="item-image"
                src={image}
                alt="item-img"
            />

            <div className="card-body">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <span className="term">Gender</span>
                        <span>{gender}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Birth Year</span>
                        <span>{birthYear}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Eye Color</span>
                        <span>{eyeColor}</span>
                    </li>
                    <li className="list-group-item">
                        <ErrorButton />
                    </li>
                </ul>
            </div>
        </React.Fragment>
    );
};
