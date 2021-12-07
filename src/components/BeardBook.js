//Imports react and required listing from outside modules
import React from "react";
import { Route, Redirect } from "react-router-dom";
//no ".js" needed in React
import { NavBar } from "./nav/NavBar";
import { ApplicationViews } from "./ApplicationViews";
import "./BeardBook.css";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
//exporting Repairs to browser in HTML
export const BeardBook = () => (
    <>
      <Route
        render={() => {
          if (localStorage.getItem("bearded")) {
            return (
              <>
                <NavBar />
                <ApplicationViews />
              </>
            );
          } else {
            return <Redirect to="/login" />;
          }
        }}
      />
  
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
    </>
  );