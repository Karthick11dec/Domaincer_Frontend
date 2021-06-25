import React, { createContext, useEffect, useState } from 'react';
import './recruiter.css';
import Navbar from "./Navbar";
import Post from "./Post";
import View from "./View";

export const recPro = createContext();

function Recruiter() {

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
        <recPro.Provider value={profile}>
            <div>
                <Navbar set={Set} />
                {value !== "view" ? <Post /> : <View />}
            </div>
        </recPro.Provider>
    )
}

export default Recruiter
