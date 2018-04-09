/* global graphql */

import React from 'react';
import Features from '../components/features';
import HowTo from '../components/how-to';
import Team from '../components/team';

const IndexPage = props =>
  (<main>
    <Features data={props.data.allDataJson.edges[0].node.features} />
    <Team data={props.data.allDataJson.edges[0].node.team} />
    <HowTo data={props.data.allDataJson.edges[0].node.howTo} />
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
