import React, { Component } from "react";
import SwapiService from "../../services";
import ErrorIndicator from "../error-indicator/error-indicator";
import Spinner from "../spinner";

import "./person-details.css";

export default class PersonDetails extends Component {
    SwapiService = new SwapiService();

    state = {
        person: null,
        loading: true,
    };

    componentDidMount() {
        this.updatePerson();
    }

    componentDidUpdate(prevProps) {
        // Всегда проверяем через условие обновилось ли значение, воизбежание бесконечного цикла
        if (this.props.personId !== prevProps.personId) {
            this.updatePerson();
        }
    }

    onPersonLoaded = (person) => {
        this.setState ({
            person,
            loading: false,
            error: false
        });
    };

    onError = (err) => {
        this.setState({
            error: true,
            loading: false,
        });
    };

    updatePerson = () => {
        const { personId } = this.props;
        if (!personId) {
            return;
        }

        this.SwapiService.getPerson(personId)
            .then(this.onPersonLoaded)
            .catch(this.onError)
        ;
        
    };

    render() {

        const { person, loading, error } = this.state;

        if (!person) {
            return <span> Select a person from a list</span>;
        }

        const hasData = !(loading||error); // Если не загрузка и не ошибка, то контент

        const errorMessage = error ? <ErrorIndicator/> : null;
        console.log(loading);
        const spinner = loading ? <Spinner/> : null;
        const content = hasData ? <PersonView person={person}/> : null; 

        return (
            <div className="person-details card">
                {errorMessage}
                {spinner}
                {content}
            </div>
        );
    }
}

const PersonView = ({person}) => {
    const { id, name, gender, birthYear, eyeColor } = person;

    return (
        <React.Fragment>
            <img
                className="person-image"
                src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
            />

            <div className="card-body">
                <h4>
                    {name}
                </h4>
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
                </ul>
            </div>
        </React.Fragment>
    );
};
