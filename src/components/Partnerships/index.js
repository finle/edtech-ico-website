import React from 'react';
import Slider from 'react-slick';
import './_partnerships.scss';

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 2000,

};

const Partnerships = props =>
  (<section className="partnerships" id="partnerships">
    <div className="container">
      <h4 className="partnerships-title">Legitimate Business Partnerships</h4>
      <Slider {...settings} className="slider">
        {props.data.map((item, i) =>
          (<div>
            <img src={item.src} alt={i} />
          </div>),
        )}
      </Slider>
    </div>
  </section>);

export default Partnerships;
