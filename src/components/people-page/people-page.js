import React, { Component } from "react";
import "./people-page.css";
import ItemList from "../item-list";
import PersonDetails from "../person-details";
import SwapiService from "../../services";
import Row from "../row";
import ErrorBoundry from "../error-boundry";


export default class PeoplePage extends Component {

    swapiService = new SwapiService();

    state = {
        selectedPerson: 3,
        hasError: false
    };

    onPersonSelected = (selectedPerson) => {
        this.setState({ selectedPerson });
    };


    render() {



        const itemList = (
            <ItemList 
                onItemSelected={this.onPersonSelected}
                getData={this.swapiService.getAllPeople}
                renderItem={({name, gender, birthYear})=>`${name} (${gender}, ${birthYear})`}
            />
        );
    
        const personDetails = (
            <ErrorBoundry>
                <PersonDetails personId={this.state.selectedPerson} />
            </ErrorBoundry>  
        );

        return (
                <Row left={itemList} right={personDetails}/>
        );
    }
}

//renderItem={({name, gender, birthYear})=>`${name} (${gender}, ${birthYear})`}
