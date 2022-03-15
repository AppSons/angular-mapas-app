import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import {Map, Popup, Marker} from 'mapbox-gl';
import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements AfterViewInit {

  @ViewChild('mapDiv')
  mapDivElement!: ElementRef

  constructor( private placesServices: PlacesService,
               private mapService: MapService) { }

  ngAfterViewInit(): void {
    if(!this.placesServices.userLocation) throw Error('No hay placesService.userlocation');

    const map = new Map({
      container: this.mapDivElement.nativeElement, 
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: this.placesServices.userLocation,
      zoom: 14 // starting zoom
    });

    const popup = new Popup()
       .setHTML(`
        <h6>Aquí estoy!!!</h6>
        <span>Estoy en este lugar del mundo</span>
       `);

    new Marker({color: 'red'})
      .setLngLat(this.placesServices.userLocation)
      .setPopup(popup)
      .addTo(map)
    
    this.mapService.setMap(map);
  }



}
