import { Component, EventEmitter, Input, Output, OnInit } from "@angular/core";
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
    this.geolocationService.createMap(new Map('map'));
    
    // Reemplazar por una Promesa
    setTimeout(() => this.geolocationService.addMarkers(this.employeesList), 500)
  }




}
