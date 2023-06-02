import { Injectable } from '@angular/core';
import { Employee } from '../interface/employee';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  public userCoord?: [number, number];
  public employees?: Employee[];

  get isUserCoords(): boolean {
    return !!this.isUserCoords;
  }

  constructor() {
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

  
}
