/* global graphql */

import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import Features from '../components/Features';
import Distribution from '../components/Distribution';
import Team from '../components/Team';
import CrowdSale from '../components/Crowdsale';
import Partnerships from '../components/Partnerships';
import Roadmap from '../components/Roadmap';
import ProgressBar from '../components/CrowdsaleProgressBar';


const IndexPage = props =>
  (<main>
    <Features data={props.data.allDataJson.edges[0].node.features} />
    <Team data={props.data.allDataJson.edges[0].node.team} />
    <Distribution data={props.data.allDataJson.edges[0].node.howTo} />
    <CrowdSale data= {props.data.allDataJson.edges[0].node.contracts} />
    <ProgressBar data={props.data.allDataJson.edges[0].node.contracts} />
    <Partnerships data={props.data.allDataJson.edges[0].node.partnerships} />
    <Roadmap />

  </main>);

//<ProgressBar data={props.data.allDataJson.edges[0].node.contracts} />
export default IndexPage;

export const pageQuery = graphql`
  query IndexQuery {
    allDataJson {
      edges {
        node {
          features {
            title
          }
          howTo {
            title
          }
          team {
            name
            picture
            description
            linkedin
            github
          }
          partnerships {
            src
          }
          contracts {
            name
            address
            abi
          }
        }
      }
    }
  }
`;
