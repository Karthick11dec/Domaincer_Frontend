import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Context } from "../../App";
import "./recruiter.css";

function Navbar({ set }) {

    const [profile, setprofile] = useState("");

    const token = useContext(Context);

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
                let f = res.data.Firstname;
                let s = res.data.Lastname;
                let fl = f.split("").splice(0, 1);
                let sl = s.split("").splice(0, 1)
                let pr = fl.concat(sl).join("").toUpperCase();
                setprofile(pr);
            })
    }, [token])

    const Logout = () => {
        localStorage.clear();
        alert("Logged Out.");
        window.location.replace("http://localhost:3000/");
    }

    return (
        <Fragment>
            <div className="navbar text-light sticky">
                <div className="ml-4">
                    <span><b>Domaincer Web</b></span>
                    <br></br>
                    <small>A website for recurite</small>
                </div>
                <div style={{ float: 'right' }} className="mr-3">
                    <div className="btn btn-primary m-2" onClick={() => { set("post") }}>Post Job</div>
                    <div className="btn btn-primary m-2" onClick={() => { set("view") }} >Applicants</div>
                    <div className="btn btn-primary m-2" >{profile}</div>
                    <div className="btn btn-primary m-2" onClick={Logout} >Logout</div>
                </div>
            </div>
        </Fragment>
    )
}

export default Navbar
