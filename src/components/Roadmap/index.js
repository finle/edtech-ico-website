import React from 'react';
import './_roadmap.scss';
import RoadMapImage from './product_roadmap.png';

const Roadmap = props =>
  (<section className="roadmap" id="roadmap">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h4 className="roadmap-title">Roadmap to the Moon and Beyond</h4>
        </div>
      </div>
      <div className="row">
        <img className="roadmap-image" src={RoadMapImage} alt="roadmap" />
      </div>
    </div>
  </section>);

export default Roadmap;
