import React, { createContext, Fragment, useReducer } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Common/Home";
import Login from "./components/Common/Login";
import Register from "./components/Common/Register";
import Reset from "./components/Common/Reset";
import Recruiter from "./components/Recruiter/Recruiter";
import Candidate from './components/Candidate/Candidate';
import Job from "./components/Candidate/Job";
import Apply from "./components/Candidate/Apply";

const token = localStorage.getItem("token");

const initialState = {
  state1: "btn-outline-success btn m-2",
  state2: "btn-outline-success btn m-2",
}

const Reducer = (state, action) => {
  switch (action) {
    case "post":
      return {
        ...state,
        state1: "btn-success btn m-2",
        state2: "btn-outline-success btn m-2",
      }
    case "view":
      return {
        ...state,
        state1: "btn-outline-success btn m-2",
        state2: "btn-success btn m-2"
      }
    default:
      return state
  }
}

export const colorContext = createContext();

export const Title = () => {
  return (
    <div className="navbar-brand ml-5" style={{ color: 'white' }}>
      <div className="d-flex justify-content-center"><b>Domaincer Web</b></div>
      <small>A website for <span className="text-success"><b>JOB</b></span> recurite and seeking</small>
    </div>
  )
}

export const fulldate = () => {
  let d = new Date();
  let year = d.toLocaleDateString().split("/").splice(2, 1);
  let month = d.toLocaleDateString().split("/").splice(0, 2).reverse();
  let full = month.concat(year).join("/");
  return full;
}

export const Logout = () => {
  localStorage.clear();
  alert("Logged Out.");
  window.location.replace("https://domaincer.netlify.app/");
}

function App() {

  const [state, Change] = useReducer(Reducer, initialState);

  return (
    <Fragment>
      <colorContext.Provider value={{ Currentstate: state, Method: Change }} >
        <BrowserRouter>
          <Switch>
            {token === null && <Route path='/' exact={true}>
              <Home />
            </Route>}
            <Route path='/register/:param' exact={true}>
              <Register />
            </Route>
            <Route path='/login' exact={true}>
              <Login />
            </Route>
            <Route path='/reset' exact={true}>
              <Reset />
            </Route>
            <Route path='/recruiter' exact={true}>
              <Recruiter />
            </Route>
            <Route path='/candidate' exact={true}>
              <Candidate />
            </Route>
            <Route path='/:id' exact={true}>
              <Job />
            </Route>
            <Route path='/:id/:apply' exact={true}>
              <Apply />
            </Route>
          </Switch>
        </BrowserRouter>
      </colorContext.Provider>
    </Fragment>
  )
}

export default App
