import React, { Component } from "react";

import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";

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
            loading: true,
            error: false,
        };

        componentDidUpdate(prevProps) {
            if (this.props.getData !== prevProps.getData) {
                this.update();
            }
        }

        componentDidMount() {
            this.update();
        }

        update() {
            this.setState({
                loading: true,
                error: false,
            });

            this.props
                .getData()
                .then((data) => {
                    this.setState({
                        data,
                        loading: false,
                    });
                })
                .catch(() => {
                    this.setState({
                        error: true,
                        loading: false,
                    });
                });
        }

        render() {
            const { data, loading, error } = this.state;

            if (loading) {
                return <Spinner />;
            }

            if (error) {
                return <ErrorIndicator />;
            }

            return <View {...this.props} data={data} />;
        }
    };
};

export default withData;
