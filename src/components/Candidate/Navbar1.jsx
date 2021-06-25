import React, { Fragment, useContext } from 'react';
import { colorContext, Title, Logout } from "../../App";
import { ProfileContext } from "./Candidate";

function Navbar1({ set }) {

    const State = useContext(colorContext);
    const profile = useContext(ProfileContext);

    return (
        <Fragment>
            <nav className="navbar navbar-expand-lg navbar-light bg-dark sticky">
                <Title />

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbar" >
                    <ul className="navbar-nav mr-auto marginificate">
                        <li className="nav-item">
                            <button className={State.Currentstate.state1} onClick={() => { set("new"); State.Method("post") }}>New Jobs</button>
                        </li>
                        <li className="nav-item">
                            <button className={State.Currentstate.state2} onClick={() => { set("applied"); State.Method("view") }}>Applied Jobs</button>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-outline-success m-2" >{!profile ? ("Profile") : (profile)}</button>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-outline-success m-2" onClick={Logout} >Logout</button>
                        </li>
                    </ul>
                </div>
            </nav>
        </Fragment>
    )
}

export default Navbar1
