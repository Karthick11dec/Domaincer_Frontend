import React, { Fragment } from "react";
import "./common.css";
import { useHistory } from "react-router-dom";
import Navbar from "./Navbar";

const Home = () => {

    const history = useHistory();

    const Type = (param) => {
        history.push(`/register/${param}`)
    }

    return (
        <Fragment>
            <Navbar />
            <div className="center rename">
                <h4 className="mid">
                    <span>Are you a recuirter and want to Post a Job?</span>
                    <small className="text" onClick={() => { Type("poster") }}><button type="button" className="btn btn-success">Click here</button></small>
                </h4>
                <h3 className="mid">[OR]</h3>
                <h4 className="mid">
                    <span>Are you a Job Seeker?</span>
                    <small className="text" onClick={() => { Type("seeker") }}><button type="button" className="btn btn-success">Click here</button></small>
                </h4>
            </div>
        </Fragment>
    )
}
export default Home;