/* global graphql */

import React from 'react';
import Features from '../components/features';
import Distribution from '../components/distribution';
import Team from '../components/team';
import CrowdSale from "../components/crowdsale";

const IndexPage = props =>
  (<main>
    <Features data={props.data.allDataJson.edges[0].node.features} />
    <Team data={props.data.allDataJson.edges[0].node.team} />
    <Distribution data={props.data.allDataJson.edges[0].node.howTo} />
    <CrowdSale data={props.data.allDataJson.edges[0].node.features}/>
  </main>);

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
        }
      }
    }
  }
`;
