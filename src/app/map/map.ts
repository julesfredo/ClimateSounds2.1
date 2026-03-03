import { Component, OnInit, signal } from '@angular/core';
import { WeatherMapService } from "../weather-map";
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [GoogleMapsModule],
  templateUrl: './map.html',
  styleUrl: './map.css',
})
export class Map implements OnInit {
  constructor(private weatherMapService: WeatherMapService) {}
  
  private lat:number = 37.98;
  private lng:number = 0;

  center = signal<google.maps.LatLngLiteral>({ lat: this.lat, lng: this.lng });
  // center2 = signal<google.maps.LatLngLiteral>({ lat: this.lat, lng: this.lng });
  // center3= signal<google.maps.LatLngLiteral>({ lat: this.lat, lng: this.lng });
  zoom1 = signal(10);
  zoom2 = signal(12);
  zoom3 = signal(9);

    options: google.maps.MapOptions = {
      mapId: 'DEMO_MAP_ID',
      disableDefaultUI: true,
      zoomControl: true
    };
  
  ngOnInit(): void {
  // Catch the loaded coordinates
    this.weatherMapService.currentLat.subscribe(coords => {
      this.lat = coords;
      this.setMap();
    });
    this.weatherMapService.currentLng.subscribe(coords => {
      this.lng = coords;
      this.setMap();
    });

    // setTimeout(() => this.setMap(), 1500);
    this.weatherMapService.getSearch().subscribe(() => {
      setTimeout(() => this.setMap(), 1500);
    });
  }

  setMap() {
    this.center.set({lat: this.lat, lng: this.lng });
  }
}
