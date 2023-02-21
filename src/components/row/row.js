import PropTypes from "prop-types";

const Row = ({ left, right }) => {
    // компонет контейнер

    return (
        <div className="row mb2">
            <div className="col-md-6">{left}</div>
            <div className="col-md-6">{right}</div>
        </div>
    );
};

Row.propTypes = {
    left: PropTypes.node,
    right: PropTypes.node,
};
// node проверяет, что left и right это что-то что можно отрендерить в JSX.
// elemtnt PropTypes может работать только с реакт компонентами.

export default Row;
