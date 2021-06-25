import React, { Fragment } from 'react';
import "./common.css";
import { Title } from "../../App";

function Navbar() {
    return (
        <Fragment>
            <div className="common text-light sticky">
                <Title />
            </div>
        </Fragment>
    )
}

export default Navbar
