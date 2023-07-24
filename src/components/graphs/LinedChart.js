import React from 'react';
import SelectBox from 'devextreme-react/select-box';
import {
  Chart,
  Series,
  ArgumentAxis,
  CommonSeriesSettings,
  Export,
  Legend,
  Margin,
  Title,
  Subtitle,
  Tooltip,
  Grid,
} from 'devextreme-react/chart';
const types = ['line', 'stackedline', 'fullstackedline'];

const LinedChart = ({data}) => {


  let type = 'line';


  function handleChange(e) {
    // this.setState({ type: e.value });
  }

    return (
      <React.Fragment>
        <Chart
          palette="Violet"
          dataSource={data}
        >
          <CommonSeriesSettings
            argumentField="id"
            type={"line"}
          />
          {
            data.map((item) => <Series
              key={item.value}
              valueField={item.value}
              name={item.name} />)
          }

          <Margin bottom={20} />
          <ArgumentAxis
            valueMarginsEnabled={false}
            discreteAxisDivisionMode="crossLabels"
          >
            <Grid visible={true} />
          </ArgumentAxis>
          <Legend
            verticalAlignment="bottom"
            horizontalAlignment="center"
            itemTextPosition="bottom"
          />
          <Export enabled={true} />
          <Title text="Energy Consumption in 2004">
            <Subtitle text="(Millions of Tons, Oil Equivalent)" />
          </Title>
          <Tooltip enabled={true} />
        </Chart>
      </React.Fragment>
    );
  }

export default LinedChart;