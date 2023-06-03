import { Injectable, Input, OnInit } from '@angular/core';
import { Employee } from '../interface/employee';
import { Map, marker, tileLayer } from 'leaflet';

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  public userCoord?: [number, number];
  public map?: Map;

  get isUserCoords(): boolean {
    return !!this.isUserCoords;
  }

  OnInit(): void {
    this.getUserLocation();
  }

  getUserLocation(): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) =>
          resolve((this.userCoord = [coords.latitude, coords.longitude])),
        (err) => {
          alert('No se pudo obtener la geolocacion, ver clg');
          console.log(err);
          reject();
        }
      );
    });
  }

  createMap(_map: Map): void {
    this.map = _map;
  }

  addMarkers(employeesList: Employee[]): void {

    
    this.map?.eachLayer((layer) => this.map?.removeLayer(layer));

    // uso de mdp by default
    let coordenadasUsuario: [number, number] = [-37.9934, -57.5491];

    // this is map draw
    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.map!);

    // if exist user location, add a marker on map
    if (this.userCoord) {
      coordenadasUsuario = this.userCoord;
      this.map?.setView(coordenadasUsuario, 15);

      const markerUser = marker(coordenadasUsuario, {
        title: 'Se encuentra aquí',
      }).addTo(this.map!).bindPopup(` 
        <h5>Ud se encuentra aquí</h5> 
        <span>
            Latitud: ${coordenadasUsuario[0]} 
            Longitud: ${coordenadasUsuario[1]} 
        </span>
      `);
    } else {
      this.map?.setView(coordenadasUsuario, 13);
    }


    // // Simular que estoy en mdp
    this.map?.setView([-37.9934,-57.5491], 15);

    // Add Marker for each employee
    for (const emp of employeesList) {
      marker([emp.geolocation.latitude, emp.geolocation.longitude], {
        title: ` ${emp.job} `,
      }).addTo(this.map!).bindPopup(` 
        <h5> ${emp.name}</h5> 
        <h6> ${emp.job}</h6>
        <span>
        Latitud: ${emp.geolocation.latitude} 
        Longitud: ${emp.geolocation.longitude} 
        </span>
      `);
    }
  }
}
