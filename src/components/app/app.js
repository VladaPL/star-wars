import React, { Component } from "react";

import Header from "../header";
import RandomPlanet from "../random-planet";
import PeoplePage from "../people-page";
//import ItemList from "../item-list";
//import PersonDetails from "../person-details";
import ErrorButton from "../error-button";

import "./app.css";
import ErrorIndicator from "../error-indicator/error-indicator";

export default class App extends Component {
    state = {
        showRandomPlanet: true,
        hasError: false
    };

    toggleRandomPlanet = () => {
        this.setState((state) => {
            return {
                showRandomPlanet: !state.showRandomPlanet,
            };
        });
    };

    onPersonSelected = (id) => {
        this.setState({
            selectedPerson: id
        });
    };

    componentDidCatch() {
        console.log('componentDidCatch()');
        this.setState({ hasError: true });
    }

    render() {

        if(this.state.hasError) {
            return <ErrorIndicator/>;
        }

        const planet = this.state.showRandomPlanet ? <RandomPlanet /> : null;

        return (
            <div className="wrapper">
                <Header />
                {/* <RandomPlanet /> */}
                {planet}
                <div className="row mb2 button-row my-styles">
                    <button
                        className="toggle-planet btn btn-warning btn-lg toggle-planet-my-styles"
                        onClick={this.toggleRandomPlanet}
                    >
                        Toggle Random Planet
                    </button>
                    <ErrorButton />
                </div>
                <PeoplePage/>
                <PeoplePage/>
                <PeoplePage/>
            </div>
        );
    }
}
