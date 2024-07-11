import React from "react";
import { Container, Nav, NavDropdown } from 'react-bootstrap';

function Navbar() {
  return (
    <div>
          <nav className="px-0 navbar navbar-expand-lg navbar-dark">
                <a className="navbar-brand" href="https://eztranx.netlify.app/">
                     <h2>ezTranx</h2>
                </a>
                {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button> */}
                <div >
                      <ul className="navbar-nav">
                            <li className="nav-item active">
                                  <a className="nav-link" href="https://eztranx.netlify.app/">Light Rail</a>
                            </li>
                      </ul>
                      <ul className="navbar-nav">
                            <li className="nav-item active">
                                  <a className="nav-link" href="https://eztranx.netlify.app/mtr/wrl">West Rail Line <span className="sr-only">(current)</span></a>
                            </li>
                      </ul>
                </div>
          </nav>
    </div>
   
  );
}

export default Navbar;
