import React, { Fragment, useEffect, useState } from 'react'
import { fulldate } from "../../App";

function Applied() {

    const [data, setdata] = useState([]);
    const [loading, setloading] = useState("Loading applied jobs...");

    const token = localStorage.getItem("token");

    useEffect(() => {

        fetch(`https://domaincer-backend.herokuapp.com/candidate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: token
            },
            body: JSON.stringify({
                date: fulldate(),
                time: new Date().toLocaleTimeString()
            })
        })
            .then(res => { return res.json() })
            .then(res => {
                // console.log(res)
                if (res.data) {
                    let rev = res.data.reverse();
                    setTimeout(() => {
                        setdata(rev);
                        setloading(false);
                    }, 500);
                }
                else if (res.error) {
                    alert(res.message);
                }
                else {
                    alert(res.message);
                }
            })

    }, [token])



    return (
        <Fragment>
            {data.length === 0 ? (<h5 className="d-flex justify-content-center text-secondary">{loading}</h5>) : (
                <Fragment>
                    {data.map((item, index) => {
                        return (
                            <div key={index} className="mt-4 mb-4">
                                {item.Data.map((i, ind) => {
                                    return (
                                        <div key={ind}>
                                            <div className="gridify">
                                                <span className="ml-3"><b>Company Name : </b><span className="ml-3">{i.Name}</span></span>
                                                <span className="marginy"><b>Applied Date : </b><span className="ml-3">{i.newdate}</span></span>
                                                <span className="marginy"><b>Applied Time : </b><span className="ml-3">{i.newtime}</span></span>
                                                <span className="marginy" ><b>status :</b><span className="ml-3">{item.status === "Applied" ? (
                                                    <strong>{item.status}</strong>) : (<strong style={{ color: 'green' }}>{item.status}</strong>)}</span></span>
                                            </div>
                                            <div className="lining"></div>
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })}
                </Fragment>
            )}
        </Fragment>
    )
}

export default Applied
