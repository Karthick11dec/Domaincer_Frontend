import React, { Fragment, useContext, useEffect, useState } from 'react'
import { Context } from '../../App';

function Applied() {

    const [data, setdata] = useState([]);

    const token = useContext(Context);

    const fulldate = () => {
        let d = new Date();
        let year = d.toLocaleDateString().split("/").splice(2, 1);
        let month = d.toLocaleDateString().split("/").splice(0, 2).reverse();
        let full = month.concat(year).join("/");
        return full;
    }

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
                console.log(res)
                if (res.data) {
                    setdata(res.data);
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
            {console.log(data)}
            <div className="applied">
                {data.map((item, index) => {
                    return (
                        <div key={index} className="data">
                            {item.Data.map((i, ind) => {
                                return (
                                    <div key={ind}>
                                        <div><b>{ind + 1}.</b></div>
                                        <div className="ml-4"><b>Company Name : </b><span className="ml-3">{i.Name}</span></div>
                                        <div className="ml-4"><b>Applied Date : </b><span className="ml-3">{i.newdate}</span></div>
                                        <div className="ml-4"><b>Applied Time : </b><span className="ml-3">{item.newtime}</span></div>
                                        <div><b>status :</b><span> Completed</span></div>
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        </Fragment>
    )
}

export default Applied
