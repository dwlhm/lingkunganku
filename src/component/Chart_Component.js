import React from 'react';
import { LineChart } from '@opd/g2plot-react';

function Chart_Component(params) {
    const config = {
        height: 400,
        title: {
          visible: true,
          text: 'Judul',
        },
        description: {
          visible: true,
          text: '自定义配置趋势线上数据点的样式',
        },
        padding: 'auto',
        forceFit: true,
        xField: 'year',
        yField: 'value',
        label: {
          visible: true,
          type: 'point',
        },
        point: {
          visible: true,
          size: 5,
        },
        xAxis: {
          tickCount: 10,
        },
        data: [
          { year: '1991', value: 3 },
          { year: '1992', value: 4 },
          { year: '1993', value: 3.5 },
          { year: '1994', value: 5 },
          { year: '1995', value: 4.9 },
          { year: '1996', value: 6 },
          { year: '1997', value: 7 },
          { year: '1998', value: 9 },
          { year: '1999', value: 11 },
        ],
      }
    
    return(
        <LineChart {...config} />
    )
}

export default Chart_Component;