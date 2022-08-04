import React, { Component } from "react";
import "./people-page.css";
import ItemList from "../item-list";
import PersonDetails from "../person-details";
import ErrorIndicator from "../error-indicator";
import SwapiService from "../../services";

export default class PeoplePage extends Component {
    state = {
        selectedPerson: 3,
        hasError: false
    };

    componentDidCatch(error, info) {
        debugger;

        this.setState ({hasError: true});
    }

    onPersonSelected = (selectedPerson) => {
        this.setState({ selectedPerson });
    };

    render() {

        if(this.state.hasError) {
            return <ErrorIndicator/>;
        }

        const swapiService = new SwapiService();

        return (
            <div className="row mb2">
                <div className="col-md-6">
                    <ItemList 
                        onItemSelected={this.onPersonSelected}
                        getData={swapiService.getAllPeople}
                        renderItem={({name, gender, birthYear})=>`${name} (${gender}, ${birthYear})`}/>
                </div>
                <div className="col-md-6">
                    <PersonDetails personId={this.state.selectedPerson} />
                </div>
            </div>
        );
    }
}
