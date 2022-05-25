import React from 'react';
import { pagesPath } from "../routers";
import { NavLink } from "react-router-dom";

const NotFound = () => {
  return <section id="notFound" className="layout__container default-title">
    <div className="notFound__content">
      <h1>404 - Not found</h1>
      <NavLink to={pagesPath.home} className="default-btn">
        <span>Go Back</span>
      </NavLink>
    </div>
  </section>;
};

export default NotFound;
