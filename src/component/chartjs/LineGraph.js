import React, { Component, useEffect } from 'react';
import Chart from 'chart.js';
import classes from './LineGraph.module.css';

export default function LineGraph(props) {
    let chartRef = React.createRef();

    useEffect(() => {
        const myChartRef = chartRef.current.getContext("2d");

        const { sampah, air, udara, labels } = props;

        console.log(props)

        new Chart(myChartRef, {
            type: "line",
            data: {
                labels: labels,
                datasets: [
                    {
                        label: "Sampah",
                        data: sampah,
                        borderColor: "#48BB78",
                        backgroundColor: "#9AE6B4"
                    },
                    {
                        label: "Tinggi Air",
                        data: air,
                        backgroundColor: "#90CDF4",
                        borderColor: "#4299E1"
                    },
                    {
                        label: "Kadar Oksigen",
                        data: udara,
                        borderColor: "#38B2AC",
                        backgroundColor: "#81E6D9"
                    }
                ]
            }
        })
    });
    
    return(
        <div>
            <canvas
                id="myChart"
                ref={chartRef}
            />
        </div>
    )

    
    
}
