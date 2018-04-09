import React from 'react';

import './_header.scss';


const Header = () =>
  (<header className="header">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="header-content">
            <span className="header-logo">
              EDTECH ICO
            </span>
            <nav className="header-nav">
              <ul className="header-nav-list">
                <li className="header-nav-list-item">
                  <a className="btn btn-primary" href="#features">Features</a>
                </li>
                <li className="header-nav-list-item">
                  <a className="btn btn-success" href="#team">Team</a>
                </li>
                <li className="header-nav-list-item">
                  <a className="btn btn-danger" href="#distribution">Distribution</a>
                </li>
                <li className="header-nav-list-item">
                  <a className="btn btn-secondary" href="#crowdsale">Crowdsale</a>
                </li>
                <li className="header-nav-list-item">
                  <a className="btn btn-dark" href="https://drive.google.com/uc?export=download&id=1gmvMa0AAh4WtQDgPwfViEsWq-6ht4hk_">Whitepaper</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </header>);

export default Header;
