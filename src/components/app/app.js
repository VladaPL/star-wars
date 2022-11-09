import React, { Component } from "react";

import Header from "../header";
import RandomPlanet from "../random-planet";
import ErrorBoundry from "../error-boundry";
import Row from "../row";

import SwapiService from "../../services/swapi-service";
import DummySwapiService from "../../services/dummy-swapi-service";

import { SwapiServiceProvider } from "../swapi-service-context/swapi-service-context";

import {
    PersonDetails,
    PlanetDetails,
    StarshipDetails,
    PersonList,
    PlanetList,
    StarshipList,
} from "../sw-components";

import "./app.css";
// import { StarshipList } from "../sw-components/item-list ";
//import StarshipDetails from "../sw-components/item-list ";

export default class App extends Component {
    state = {
        showRandomPlanet: true,
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
        const planet = this.state.showRandomPlanet ? <RandomPlanet /> : null;

        return (
            <ErrorBoundry>
                <SwapiServiceProvider value={this.state.swapiService}>
                    <div className="stardb-app">
                        <Header onServiceChange={this.onServiceChange} />
                        {planet}
                        <Row
                            left={<PersonList />}
                            right={<PersonDetails itemId={11} />}
                        />
                        <Row
                            left={<PlanetList />}
                            right={<PlanetDetails itemId={5} />}
                        />
                        <Row
                            left={<StarshipList />}
                            right={<StarshipDetails itemId={15} />}
                        />
                    </div>
                </SwapiServiceProvider>
            </ErrorBoundry>
        );
    }
}
