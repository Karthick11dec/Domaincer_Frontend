import React, { createContext, useEffect, useState } from 'react';
import './candidate.css';
import Navbar1 from "./Navbar1";
import Applied from "./Applied";
import Newjob from "./Newjob";

export const ProfileContext = createContext();

function Candidate() {

    const [value, setvalue] = useState("");
    const [profile, setprofile] = useState("");

    const token = localStorage.getItem("token");

    const Set = (param) => {
        setvalue(param);
    }

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
        <ProfileContext.Provider value={profile}>
            <div>
                <Navbar1 set={Set} />
                {value !== "applied" ? <Newjob /> : <Applied />}
            </div>
        </ProfileContext.Provider>
    )
}

export default Candidate
