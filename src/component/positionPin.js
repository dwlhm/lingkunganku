import React from 'react';
import { Marker } from 'react-map-gl';

export default function positionPin(props) {
    return(
        <Marker key={`marker-${props.index}`} longitude={props.alat.longitude} latitude={props.alat.latitude} class="preorder">
            <i className={`fas fa-map-marker-alt markerAlat markerTrashX ${props.jenis}`}></i>
        </Marker>
    )
}