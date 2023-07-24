import React from 'react';

import {
  Chart, Series, CommonSeriesSettings, Legend, ValueAxis, Title, Export, Tooltip,
} from 'devextreme-react/chart';

const StackedBar = ({data,title,keys,type,keyID}) => {

  function customizeTooltip(arg) {
    
    return {
      text: `Date: ${arg.argumentText} Count: ${arg.valueText}`,
    };
  }

    return (
      <Chart
        id="chart"
        title={title}
        dataSource={data}
      >
        <CommonSeriesSettings argumentField={keyID} type={type} 
        />
        {
            keys.map((item,index) => (
                <Series
                    key={index}
                    valueField={item.key}
                    name={item.name}
                    />
            ))  
        }
        <Export enabled={true} />
        <Tooltip
          enabled={true}
          location="edge"
          customizeTooltip={customizeTooltip}
        />
      </Chart>
    );
}

export default StackedBar;
