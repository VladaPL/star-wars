import React, { Component } from "react";

import Header from "../header";
import RandomPlanet from "../random-planet";
import ErrorBoundry from "../error-boundry";
import { PeoplePage, PlanetPage, StarshipPage } from "../pages";
import SwapiService from "../../services/swapi-service";
import DummySwapiService from "../../services/dummy-swapi-service";
import { SwapiServiceProvider } from "../swapi-service-context/swapi-service-context";
import "./app.css";

export default class App extends Component {
    state = {
        //showRandomPlanet: true,
        swapiService: new SwapiService(),
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

    render() {
        //const planet = this.state.showRandomPlanet ? <RandomPlanet /> : null;

        return (
            <ErrorBoundry>
                <SwapiServiceProvider value={this.state.swapiService}>
                    <div className="stardb-app">
                        <Header onServiceChange={this.onServiceChange} />
                        <RandomPlanet />
                        <PeoplePage />
                        <PlanetPage />
                        <StarshipPage />
                    </div>
                </SwapiServiceProvider>
            </ErrorBoundry>
        );
    }
}
