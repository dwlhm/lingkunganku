import React, { Component, useState } from 'react';
import LineGraph from './chartjs/LineGraph';
import { managerData, yearLabels, nationalAverageData, managerQuarterData } from './mockData';

export default function Chart_Element(props) {

    return(
        <div>
            <LineGraph
                sampah={props.sampah}
                air={props.air}
                udara={props.udara}
                labels={props.labels}
                />
        </div>
    )
}