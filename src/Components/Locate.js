import React, { Component } from 'react'
import { Map } from 'react-store-locator';
import loc from '../assets/location.png';

export default class Locate extends Component {
    render() {
        const locations = [
            {
            id: 1,
            lat: 19.0760,
            lng: 72.8777,
            show: true,
            name: 'Mumbai'
          },
          {
            id: 2,
            lat: 22.2587,
            lng: 71.1924,
            show: true,
            name: 'Gujrat'
          },
          {
            id: 3,
            lat: 27.0238,
            lng: 74.2179,
            show: true,
            name: 'Rajasthan' //25.0961
          },
          {
            id: 4,
            lat: 25.0961,
            lng: 85.3131,
            show: true,
            name: 'Bihar' //25.0961
          }
          ]
        return (
            <div className="map m-4">
                 <Map 
                  initialZoom={5}
                  searchMarker={{icon: loc}}
                 locations={locations} mapOptions = {{}} googleApiKey={'AIzaSyAnJUJEoB6P_693eFppW5o_c9pFeSi1-7E'}/>
                
            </div>
        )
    }
}
