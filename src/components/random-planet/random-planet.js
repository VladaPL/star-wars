import React, { Component } from "react";
import SwapiService from "../../services";
import Spinner from "../spinner";

import "./random-planet.css";

export default class RandomPlanet extends Component {
    SwapiService = new SwapiService(); // вызвали сервис, который получит данные

    state = {
        planet: {},
        loading: true,
    };

    // Отправляем запрос к серверу каждый раз когда создаем компонент, он будет сам себя обновлять (поэтому вызов в конструкторе)

    constructor() {
        super();
        this.updatePlanet();
    }

    onPlanetLoaded = (planet) => {
        this.setState({ planet, loading: false });
    };

    updatePlanet() {
        const id = Math.floor(Math.random() * 25) + 2;
        this.SwapiService.getPlanet(id).then(this.onPlanetLoaded);
    }

    render() {
        const { planet, loading } = this.state;

        const spinner = loading ? <Spinner /> : null;
        const content = !loading ? <PlanetView planet={planet} /> : null;

        return (
            <div className="random-planet jumbotron rounded my-styles">
                {spinner}
                {content}
            </div>
        );
    }
}

const PlanetView = ({ planet }) => {
    const { id, name, population, rotationPeriod, diameter } = planet;

    return (
        <React.Fragment>
            <img
                className="planet-image"
                src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
            />
            <div>
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <span className="term">Population</span>
                        <span>{population}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Rotation Period</span>
                        <span>{rotationPeriod}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Diameter</span>
                        <span>{diameter}</span>
                    </li>
                </ul>
            </div>
        </React.Fragment>
    );
};
