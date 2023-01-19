import React from "react";
import ItemList from "../item-list";
import { withData, withSwapiService } from "../hoc-helpers";

// * Partially applied func - техника частично примененные ф-ии

const withChildFunction = (fn) => (Wrapped) => {
    return (props) => {
        return <Wrapped {...props}>{fn}</Wrapped>;
    };
};

const renderName = ({ name }) => <span>{name}</span>;
const renderModelAndName = ({ model, name }) => (
    <span>
        {name} ({model})
    </span>
);

const mapPersonMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getAllPeople,
    };
};

const mapPlanetMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getAllPlanets,
    };
};

const mapStarshipMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getAllStarships,
    };
};

const PersonList = withSwapiService(mapPersonMethodsToProps)(
    withData(withChildFunction(renderName)(ItemList))
);

const PlanetList = withSwapiService(mapPlanetMethodsToProps)(
    withData(withChildFunction(renderName)(ItemList))
);

const StarshipList = withSwapiService(mapStarshipMethodsToProps)(
    withData(withChildFunction(renderModelAndName)(ItemList))
);

// Каждый компонент высшего порядка, после того, как мы ее частично сфигурировали,
// принимает ровно один аргумент - это тот компонент, который нужно обернуть.
// А за тем обернутый компонент передается выще по цепочке.
// То есть результат вызванной ф-ии передается ф-ии выше по цепочке, код просто выполняется справа налево.

export { PersonList, PlanetList, StarshipList };

// * Создание ф-ии compose

const compose =
    (...funcs) =>
    (comp) => {
        // ???
    };
// проходимся по массиву аргумента ф-ии компоуз ([f,f,f] из ф-ий состоит)  и передаем каждой ф-ии результат предыдущей ф-ии
// возвращаем самый последний результат ф-ии компоуз

compose(a, b, c)(value);
// и
a(b(c(value)));
// это одно и то же
