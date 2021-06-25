import React, { Fragment, useEffect, useState } from 'react';
import "./recruiter.css";

function View() {

    const [loading, setloading] = useState("Loading the applicants details...");
    const [data, setdata] = useState([]);
    const [submit, setsubmit] = useState([]);

    const token = localStorage.getItem("token");

    useEffect(() => {

        fetch("https://domaincer-backend.herokuapp.com/posted", {
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

    useEffect(() => {

        fetch("https://domaincer-backend.herokuapp.com/recruiter", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: token
            },
        })
            .then(res => { return res.json() })
            .then(res => {
                // console.log(res)
                if (res.data) {
                    setsubmit(res.data);
                }
                else if (res.error) {
                    alert(res.message);
                }
                else {
                    alert(res.message);
                }
            })

    }, [token])


    const Status = (id) => {
        fetch(`https://domaincer-backend.herokuapp.com/status/${id}`, {
            headers: {
                "Content-Type": "application/json",
                authorization: token
            }
        })
            .then(res => { return res.json() })
            .then(res => {
                // console.log(res);
            })
    }


    return (
        <Fragment>
            {loading ? (<h5 className="text-secondary d-flex justify-content-center">{loading}</h5>) : (<Fragment>
                {data.map((item, index) => {
                    return (
                        <div key={index} className="card p-3">
                            <div className="card-header">
                                <details>
                                    <summary>
                                        <div>
                                            <small><strong>Note : </strong>
                                                click over to view the <strong>applicants</strong><strong> and</strong> if it is empty which means no applicants for a job
                                            </small>
                                            <div className="pt-2 pb-2">
                                                <b>Posted Date :</b>
                                                <div className="ml-5">{item.Dates}</div>
                                            </div>
                                            <div className="pt-2 pb-2">
                                                <b>Job Title :</b>
                                                <div className="ml-5">{item.Title}</div>
                                            </div>
                                        </div>
                                    </summary>
                                    <div className="white">
                                        {submit.filter(i => i.Title === item.Title).map((value, indexes) => {
                                            return (
                                                <div className="p-2 hovering"
                                                    key={indexes}
                                                    onClick={() => { Status(value._id) }}
                                                    data-toggle="tooltip"
                                                    data-placement="top"
                                                    title="viewing information sent to applicants if click over here"
                                                >
                                                    <div className="grid fullblock">
                                                        <b>{indexes + 1}.<span className="ml-2">{value.Name}</span></b>
                                                        <div>
                                                            Link to
                                                            <a href={value.Resume} target="_blank" rel="noreferrer"><b className="ml-1 line">Resume</b></a>
                                                        </div>
                                                        <div>
                                                            Link to
                                                            <a href={value.Portifolio} target="_blank" rel="noreferrer"><b className="ml-1 line">Portifolio</b></a>
                                                        </div>
                                                        <div>
                                                            Link to
                                                            <a href={value.Git} target="_blank" rel="noreferrer"><b className="ml-1 line">Gitrepo</b></a>
                                                        </div>
                                                        {value.Data.map((it, index) => {
                                                            return (
                                                                <Fragment key={index}>
                                                                    <div><b>Date :</b> {it.Dates}</div>
                                                                    <div><b>Time :</b> {it.Time}</div>
                                                                </Fragment>
                                                            )
                                                        })}
                                                    </div>
                                                    <div className="lining"></div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </details>
                            </div>
                        </div>
                    )
                })}
            </Fragment>)
            }
        </Fragment>
    )
}

export default View
