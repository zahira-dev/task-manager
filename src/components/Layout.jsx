/* eslint-disable react/prop-types */
import React from "react";

import { Link } from "react-router-dom";
const Layout = (props) => {
  return (
    <div>
      <Link to="/">Home </Link>

      {props.children}
    </div>
  );
};

export default Layout;
