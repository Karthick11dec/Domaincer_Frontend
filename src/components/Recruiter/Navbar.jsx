import React, { Fragment, useContext } from 'react';
import "./recruiter.css";
import { colorContext, Logout, Title } from "../../App";
import { recPro } from './Recruiter';

function Navbar({ set }) {

    const State = useContext(colorContext);
    const profile = useContext(recPro);

    return (
        <Fragment>
            <nav className="navbar navbar-expand-lg navbar-light sticky bg-dark">
                <Title />

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbar" >
                    <ul className="navbar-nav mr-auto marginificate"> 
                        <li className="nav-item">
                            <button className={State.Currentstate.state1} onClick={() => { set("post"); State.Method("post") }}>Post Job</button>
                        </li>
                        <li className="nav-item">
                            <button className={State.Currentstate.state2} onClick={() => { set("view"); State.Method("view") }} >Applicants</button>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-outline-success m-2">{!profile ? ("Profile") : (profile) }</button>
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

export default Navbar
