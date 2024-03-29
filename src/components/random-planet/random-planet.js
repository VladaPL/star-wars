import React, { Component } from "react";
import PropTypes from "prop-types";
import SwapiService from "../../services/swapi-service";
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator/error-indicator";

import "./random-planet.css";

export default class RandomPlanet extends Component {
    static defaultProps = {
        updateInterval: 10000,
    };

    // propTypes проверяет значения свойств и кидает в консоль сообщение об ощибке переданного типа данных в пропс.
    static propTypes = {
        updateInterval: PropTypes.number,
    };

    SwapiService = new SwapiService(); // вызвали сервис, который получит данные

    state = {
        planet: {},
        loading: true,
    };
    // Отправляем запрос к серверу каждый раз когда создаем компонент, он будет сам себя обновлять (поэтому вызов в конструкторе)

    componentDidMount() {
        // Используем для инициализации (работа с DOM-элементами, получение данных).
        const { updateInterval } = this.props;
        this.updatePlanet();
        this.interval = setInterval(this.updatePlanet, updateInterval);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    onPlanetLoaded = (planet) => {
        this.setState({
            planet,
            loading: false,
            error: false,
        });
    };

    onError = (err) => {
        this.setState({
            error: true,
            loading: false,
        });
    };

    updatePlanet = () => {
        const id = Math.floor(Math.random() * 25) + 3;
        this.SwapiService.getPlanet(id)
            .then(this.onPlanetLoaded)
            .catch(this.onError);
    };

    render() {
        const { planet, loading, error } = this.state;

        const hasData = !(loading || error);

        const errorMessage = error ? <ErrorIndicator /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = hasData ? <PlanetView planet={planet} /> : null;

        return (
            <div className="random-planet jumbotron rounded my-styles">
                {errorMessage}
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
                alt="planet"
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
