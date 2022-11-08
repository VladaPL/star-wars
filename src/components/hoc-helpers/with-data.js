import React, { Component } from "react";

import Spinner from "../spinner";
//import ErrorIndicator from '../error-indicator';

//* Компонент высшего порядка (HOC):
// Создали ф-ый компонент, который возвращает класс.
// Этот класс позволил вынести всю логику работы с сетью и стейт,
// а также логику, какой компонент отображать.
// withData - это компонент менеджмента данных, отвечает за логику работы с сетью.
// А из ItemList сделали компонент ф-ию, тк теперь он не содержит стейт.

const withData = (View) => {
    return class extends Component {
        state = {
            data: null,
        };

        componentDidMount() {
            this.props.getData().then((data) => {
                this.setState({
                    data,
                });
            });
        }

        render() {
            const { data } = this.state;

            if (!data) {
                return <Spinner />;
            }

            return <View {...this.props} data={data} />;
        }
    };
};

export default withData;
