import React from "react";
import { withSwapiService } from "../hoc-helpers";

import ItemDetails from "../item-details";
import Record from "../record";

const PlanetDetails = (props) => {
    return (
        <ItemDetails {...props}>
            <Record field="population" label="Population" />
            <Record field="rotationPeriod" label="Rotation Period" />
            <Record field="diameter" label="Diameter" />
        </ItemDetails>
    );
};

const mapMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getPlanet,
        getImageUrl: swapiService.getPlanetImage,
    };
};

export default withSwapiService(mapMethodsToProps)(PlanetDetails);
