import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import Measure from 'react-measure';
import axios from 'axios';

import positionPin from './positionPin';

function Home_MAP(props) {
    const [size, setSize] = useState({
        width:window.innerWidth,
        height:window.innerHeight-10
    })
    const [viewport, setViewport] = useState({
        latitude: 37.8,
        longitude: -122.4,
        zoom: 14,
        bearing: 0,
        pitch: 0
      });
    const [position, setPosition] = useState({
        sampah: {
            lat: 0,
            lon: 0
        }, udara: {
            lat: 0,
            lon: 0
        }, sungai: {
            lat: 0,
            lon: 0
        }
    });

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            setViewport({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                zoom: 14,
                bearing: 0,
                pitch: 0
            });
            //console.log(viewport)
        });
    }
    useEffect(()=> {
        axios.get('http://lingkungankuserver.herokuapp.com/get/position/1')
            .then(response => {
                setPosition(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, [2, 3,4])
        
    
    
    return(
        <Measure 
            bounds
            onResize={contentRect => {
                setSize(contentRect.bounds)
            }}
        >
            {({ measureRef }) => (
                <div className="w-9/12 h-screen p-10 pl-0">
            <div ref={measureRef} className="rounded shadow-xl h-full w-full">
                <ReactMapGL
                    className="mapContainer"
                    {...viewport}
                    width={size.width}
                    height={size.height}
                    onViewportChange={setViewport}
                    mapboxApiAccessToken={"pk.eyJ1IjoibWF1bGFuYTAyNiIsImEiOiJjazFvODM2cXowZHNhM2hvaWttNnlkczFxIn0.GytjwhxtQ1VS1wysWsp89A"} 
                >
                </ReactMapGL>
            </div></div>
            )}
        </Measure>
    )
}

export default Home_MAP;