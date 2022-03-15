import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feature, PlacesResponse } from '../interfaces/places';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public userLocation?: [number, number];
  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];
  
  get isUserLocationReady(): boolean {
    return !!this.userLocation;
  }

  constructor( private http: HttpClient) { 
    this.getUserLocation();
  }

  public async getUserLocation(): Promise<[number, number]> {
    
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({coords}) => {
          this.userLocation = [coords.longitude, coords.latitude];
          resolve(this.userLocation );
        },
        (err)=> {
          alert('No se pudo obtener la geolocalización')
          console.log(err);
          reject();
        }
      );
    });
  }
  getPlacesByQuery( query: string = ''){
    //TODO: Evaluar cuando el query es nulo
    this.isLoadingPlaces = true;

    this.http.get<PlacesResponse>(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?limit=5&proximity=-3.6915554303894,41.66229668808742&language=es&access_token=pk.eyJ1IjoiYXBwc29ucyIsImEiOiJja2FjcWw3N2IxaXhnMnptdG8xdGRmZTJhIn0.bLOW2-ivzhDjTqHPL6Lv8Q`)
        .subscribe( resp => {
          console.log(resp.features);

          this.isLoadingPlaces = false;
          this.places = resp.features;
        });
  }
}
