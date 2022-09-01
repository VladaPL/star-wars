import React, { Component } from "react";

import Header from "../header";
//import RandomPlanet from "../random-planet";
//import PeoplePage from "../people-page";
//import ItemList from "../item-list";
import ItemDetails from "../item-details";
//import ErrorButton from "../error-button";
import ErrorBoundry from "../error-boundry";

import "./app.css";
import ErrorIndicator from "../error-indicator/error-indicator";
import SwapiService from "../../services";
import Row from "../row";

export default class App extends Component {
    swapiService = new SwapiService();

    state = {
        showRandomPlanet: true,
        hasError: false,
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
            selectedPerson: id,
        });
    };

    componentDidCatch() {
        console.log("componentDidCatch()");
        this.setState({ hasError: true });
    }

    render() {
        if (this.state.hasError) {
            return <ErrorIndicator />;
        }

        // const itemList = (
        //     <ItemList
        //         onItemSelected={this.onPersonSelected}
        //         getData={this.swapiService.getAllPlanets}
        //         renderItem={(item) => item.name}
        //     />
        // );

        const { getPerson,
            getStarship,
            getPersonImage,
            getStarshipImage } = this.swapiService;

        const personDetails = (
            <ItemDetails
                itemId={11} 
                getData={getPerson} 
                getImageUrl={getPersonImage} />
        );

        const starshipDetails = (
            <ItemDetails
                itemId={5}
                getData={getStarship}
                getImageUrl={getStarshipImage} 
            />
        );

        //const planet = this.state.showRandomPlanet ? <RandomPlanet /> : null;

        return (
            <ErrorBoundry>
                <div className="wrapper">
                    <Header />
                    {/* {planet}
                    <div className="row mb2 button-row my-styles">
                        <button
                            className="toggle-planet btn btn-warning btn-lg toggle-planet-my-styles"
                            onClick={this.toggleRandomPlanet}
                        >
                            Toggle Random Planet
                        </button>
                        <ErrorButton />
                    </div>
                    <PeoplePage /> */}
                    <Row left={personDetails} right={starshipDetails} />
                </div>
            </ErrorBoundry>

        );
    }
}
