import React, { Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import "./candidate.css";

function Newjob() {

    const [data, setdata] = useState([]);
    const [loading, setloading] = useState("Loading new jobs...");

    const token = localStorage.getItem("token");
    const history = useHistory();

    useEffect(() => {

        fetch("https://domaincer-backend.herokuapp.com/getter", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: token
            },
        })
            .then(res => { return res.json() })
            .then(res => {
                let rev = res.data.reverse();
                setTimeout(() => {
                    setdata(rev);
                    setloading(false);
                }, 500);
            })

    }, [token])

    const View = (id) => {
        history.push(`/${id}`);
    }

    return (
        <Fragment>
            {data.length === 0 ? (<h5 className="d-flex justify-content-center text-secondary">{loading}</h5>) : (
                <Fragment>
                    <span type="button" className="sticky1 background">New Jobs ➣ </span>
                    {data.map((item, index) => {
                        return (
                            <div key={index} className="structure">
                                <div className="card cardclass">
                                    <div className="card-header">
                                        <div><b>Posted On : </b>{item.Dates}</div>
                                    </div>
                                    <div className="card-body padd">
                                        <p><span><b>Company Name : {item.Name} </b></span></p>
                                        <div>
                                            <b>Job Title : </b>
                                            <div className="ml-5">{item.Title}</div>
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <div style={{ float: 'left' }}><b>CTC : </b>{item.Ctc}</div>
                                        <div className="mr-3" style={{ float: 'right' }}>
                                            <button type="button" className="btn btn-success" onClick={() => { View(item._id) }}>View and apply</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </Fragment>
            )}
        </Fragment>
    )
}

export default Newjob
