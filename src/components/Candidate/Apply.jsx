import React, { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Navbar2 from "./Navbar2";
import { fulldate } from "../../App";

function Apply() {

    const [Name, setName] = useState("");
    const [Resume, setResume] = useState("");
    const [Git, setGit] = useState("");
    const [Portifolio, setPortifolio] = useState("");
    const [Sign, setSign] = useState(true);
    const [apply, setapply] = useState("Submit");

    const { id } = useParams();
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (Name.length > 0 && Resume.length > 10 && Git.length > 5 && Portifolio.length > 5) {
            setSign(false);
        }
    }, [Name.length, Resume.length, Git.length, Portifolio.length])

    const Erase = () => {
        setName("");
        setResume("");
        setGit("");
        setPortifolio("");
    }

    const Handler = (e) => {
        e.preventDefault();

        fetch(`https://domaincer-backend.herokuapp.com/submit/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: token
            },
            body: JSON.stringify({
                name: Name,
                resume: Resume,
                git: Git,
                portifolio: Portifolio,
                date: fulldate(),
                time: new Date().toLocaleTimeString()
            })
        })
            .then(res => { return res.json() })
            .then(res => {
                if (res.task) {
                    setapply("Applied");
                    setSign(false);
                    Erase();
                    setTimeout(() => {
                        alert(res.message);
                        window.location.href = "https://domaincer.netlify.app/candidate";
                    }, 1000);
                }
                else if (res.message === "Already you were Applied!") {
                    setSign(false);
                    Erase();
                    setTimeout(() => {
                        alert("Already you were Applied!");
                        window.location.href = "https://domaincer.netlify.app/candidate";
                    }, 1000);
                }
                else if (res.message === "Id not found!") {
                    alert("Id not found!")
                }
            })
    }

    return (
        <Fragment>
            <Navbar2 />
            <form className ="mx-auto m-3 main square1">
            <div className="card-header">
                <h3 className="pb-2">Apply for the Recuirment</h3>
                <div className="form-group">
                    <label><b>Name : </b></label>
                    <textarea
                        className="textarea form-control"
                        rows="1"
                        value={Name}
                        onChange={(e) => { setName(e.target.value) }}
                    />
                </div>
                <div className="form-group">
                    <label><b>Resume URL : (Google Drive)</b></label>
                    <textarea
                        className="textarea form-control"
                        rows="2"
                        value={Resume}
                        onChange={(e) => { setResume(e.target.value) }}
                    />
                </div>
                <div className="form-group">
                    <label><b>Git URL :</b></label>
                    <textarea
                        className="textarea form-control"
                        rows="2"
                        value={Git}
                        onChange={(e) => { setGit(e.target.value) }}
                    />
                </div>
                <div className="form-group">
                    <label><b>Portifolio URL :</b></label>
                    <textarea
                        className="textarea form-control"
                        rows="2"
                        value={Portifolio}
                        onChange={(e) => { setPortifolio(e.target.value) }}
                    />
                </div>
                <div className="d-flex justify-content-center pt-3 pb-3">
                    <button
                        disabled={Sign}
                        className="btn btn-success"
                        style={{ width: "40%" }}
                        onClick={(e) => { Handler(e) }}
                    >
                        {apply}
                    </button>
                </div>
            </div>
            </form>
        </Fragment>
    )
}

export default Apply
