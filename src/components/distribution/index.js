import React from 'react';

import './_distribution.scss';
import PieChart from '../PieChart';

const NewsListing = props =>
  (<section className="distribution" id="distribution">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h4 className="distribution-title">Token Distribution Metrics</h4>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <ul className="distribution-list">
            {props.data.map((item, i) =>
              (<li className="distribution-item" key={i}>
                {item.title}
              </li>),
            )}
          </ul>
        </div>
      </div>
      <PieChart />
    </div>
  </section>);

export default NewsListing;
