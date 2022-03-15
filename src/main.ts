import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import Mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
 
Mapboxgl.accessToken = 'pk.eyJ1IjoiYXBwc29ucyIsImEiOiJja2FjcWw3N2IxaXhnMnptdG8xdGRmZTJhIn0.bLOW2-ivzhDjTqHPL6Lv8Q';

if (!navigator.geolocation) {
  alert('Navegador no soporta Geolocation');
  throw new Error('El Navegador no soporta geolocalización');
}

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
