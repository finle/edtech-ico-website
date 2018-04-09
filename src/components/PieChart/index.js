import React from 'react';
import { Chart } from 'react-google-charts';

const PieChart = props =>
  (
    <div>
      <Chart
        chartType="PieChart"
        data={[['Group', 'Percentage'], ['Company Yacht Parties', 20], ['Institutional Investors', 20], ['Advisors', 10], ['Crowdsale', 10], ['Team', 40]]}
        options={{backgroundColor: '#f4f4f4'}}
        graph_id="PieChart"
        width="100%"
        height="400px"
        legend_toggle
      />
    </div>
  );

export default PieChart;
