import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => {
return <div className="top-bar">
    <span>My Albums</span>
      <Link className="nav-link" onClick = {props.logoutHandler} to = '/'>
        Logout
      </Link>
  </div>;
}