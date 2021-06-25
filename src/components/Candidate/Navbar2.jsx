import React, { Fragment, useEffect, useState } from 'react';
import { Title, Logout } from "../../App";

function Navbar2() {

    const [profile, setprofile] = useState("");

    const token = localStorage.getItem("token");

    useEffect(() => {
        fetch("https://domaincer-backend.herokuapp.com/profile", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: token
            },
        })
            .then(res => { return res.json() })
            .then(res => {
                let f = res.data.Firstname.split("").slice(0, 1).join("").toUpperCase();
                let s = res.data.Lastname.split("").slice(0, 1).join("").toUpperCase();
                setprofile([f].concat([s]).join(""));
            })
    }, [token])

    return (
        <Fragment>
            <nav className="navbar navbar-expand-lg navbar-light bg-dark sticky">
                <Title />

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbar" >
                    <ul className="navbar-nav mr-auto marginificate2">
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

export default Navbar2
