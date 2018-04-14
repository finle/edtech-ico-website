import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Header from '../components/Header';
import Footer from '../components/Footer';

import '../../sass/style.scss';

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet
      title="Gatsby React Boiler"
    />
    <Header />
    {children()}
    <Footer />
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func,
};

export default TemplateWrapper;
