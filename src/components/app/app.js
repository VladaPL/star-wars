import React, { Component } from "react";

import Header from "../header";
import RandomPlanet from "../random-planet";
import ErrorBoundry from "../error-boundry";

import ItemDetails from "../item-details/item-details";
import Record from "../record";
import SwapiService from "../../services/swapi-service";
import DummySwapiService from "../../services/dummy-swapi-service";

import { SwapiServiceProvider } from "../swapi-service-context/swapi-service-context";

import {
    PersonDetails,
    PlanetDetails,
    PersonList,
    PlanetList,
} from "../sw-components";

import "./app.css";
import { StarshipList } from "../sw-components/item-list ";

export default class App extends Component {
    state = {
        showRandomPlanet: true,
        swapiService: new DummySwapiService(),
    };

    onServiceChange = () => {
        this.setState(({ swapiService }) => {
            const Service =
                swapiService instanceof SwapiService
                    ? DummySwapiService
                    : SwapiService;
            console.log("this", Service.name);
            return {
                swapiService: new Service(),
            };
        });
    };

    toggleRandomPlanet = () => {
        this.setState((state) => {
            return {
                showRandomPlanet: !state.showRandomPlanet,
            };
        });
    };

    render() {
        const planet = this.state.showRandomPlanet ? <RandomPlanet /> : null;

        const { getPerson, getStarship, getPersonImage, getStarshipImage } =
            this.state.swapiService;

        const personDetails = (
            <ItemDetails
                itemId={11}
                getData={getPerson}
                getImageUrl={getPersonImage}
            >
                <Record field="gender" label="Gender" />
                <Record field="eyeColor" label="Eye Color" />
            </ItemDetails>
        );

        const starshipDetails = (
            <ItemDetails
                itemId={5}
                getData={getStarship}
                getImageUrl={getStarshipImage}
            >
                <Record field="model" label="Model" />
                <Record field="length" label="Length" />
                <Record field="costInCredits" label="Cost" />
            </ItemDetails>
        );

        return (
            <ErrorBoundry>
                <SwapiServiceProvider value={this.state.swapiService}>
                    <div className="stardb-app">
                        <Header onServiceChange={this.onServiceChange} />

                        <PersonDetails itemId={11} />

                        <PlanetDetails itemId={5} />

                        <PersonList />

                        <PlanetList />

                        <StarshipList />
                    </div>
                </SwapiServiceProvider>
            </ErrorBoundry>
        );
    }
}
