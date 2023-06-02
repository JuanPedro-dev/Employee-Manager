import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Employee } from '../../interface/employee';
import { Map, map, marker, tileLayer } from 'leaflet';
import { GeolocationService } from '../../services/geolocation.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit{
  constructor(private geolocationService: GeolocationService) {}

  @Input()
  public employeesList: Employee[] = [];

  ngOnInit(): void {
    setTimeout(() => this.mapBuilder(), 500)
  }


  mapBuilder(): void {
    // uso de mdp by default
    let coordenadasUsuario: [number, number] = [-37.9934, -57.5491];

    let map = undefined;
    map = new Map('map');

    // if exist user location, add a marker on map
    if (this.geolocationService.userCoord) {
      coordenadasUsuario = this.geolocationService.userCoord;
      map.setView(coordenadasUsuario, 15);

      const markerUser = marker(coordenadasUsuario, {
        title: 'Se encuentra aquí',
      }).addTo(map).bindPopup(` 
        <h5>Ud se encuentra aquí</h5> 
        <span>
            Latitud: ${coordenadasUsuario[0]} 
            Longitud: ${coordenadasUsuario[1]} 
        </span>
      `);
    } else {
      map.setView(coordenadasUsuario, 13);
    }

    // this is map draw
    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    // Simular que estoy en mdp
    map.setView([-37.9934,-57.5491], 15);

    // Add Marker for each employee
    for (const emp of this.employeesList) {
      marker([emp.geolocation.latitude, emp.geolocation.longitude], {
        title: ` ${emp.job} `,
      }).addTo(map).bindPopup(` 
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
