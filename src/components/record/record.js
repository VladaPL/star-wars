import React, { Component } from "react";

//import ErrorButton from '../error-button/error-button';

import "./record.css";

const Record = ({ item, field, label }) => {
    return (
        <li className="list-group-item">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    );
};

export default Record;
