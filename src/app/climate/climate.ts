import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WeatherMapService } from '../weather-map';
import { GlobalConstants } from '../GlobalConstants'


@Component({
  selector: 'app-climate',
  imports: [
    FormsModule,

  ],
  templateUrl: './climate.html',
  styleUrl: './climate.css',
})
export class Climate implements OnInit {
  public title: string = 'ClimateSounds';
  
  public resp: Object = {}
  public lat:number = 0;
  public lng: number = 0;
  // public coordinates:google.maps.LatLng;
  public apiKey: string = '6fc7fbfa50e84e79bdcf4f6b6f1f1527';
  public fields: string = 'city,latitude,longitude';
  public geoLocationUrl: string = 
  'https://api.ipgeolocation.io/ipgeo?apiKey='
  + this.apiKey + '&fields=' + this.fields;

  public city: string = ""
  public description: string = "";
  public temp: number = 0
  public tempF: string = ""
  public tempC: string = ""
  public wind: string= ""
  public weather: string= ""
  
  public locale: string= ""
  public far: string= "Fahrenheit"
  public cel: string= "Celsius"

  constructor(private weatherMapService: WeatherMapService) {};
  ngOnInit(): void {
    this.weatherMapService.currentLat.subscribe(coord => this.lat = coord);
    this.weatherMapService.currentLng.subscribe(coord => this.lng = coord);
    this.weatherMapService.getLocation(this.geoLocationUrl)
      .subscribe(data => {
        this.lat = data.latitude;
        this.lng = data.longitude;
      });
      
      setTimeout(()=>{this.weatherMapService.getWeather(this.lat, this.lng)
      .subscribe(response => {
        this.description = response.weather[0].description;
        GlobalConstants.desc = response.weather[0].description;
        this.temp = 1.8*(response.main.temp-273) + 32;
        this.tempF = (this.temp).toFixed(1);
        this.tempC = ((response.main.temp)-273.15).toFixed(1);
        this.wind = (response.wind.speed).toFixed(1) + " mph";
        this.city = response.name;
        this.lat = response.coord.lat;
        this.lng = response.coord.lon;
      })
    }, 1900);
    setInterval(() => this.changeCoords(), 1500);

  }

  onSubmit() {
    this.weatherMapService.getWeatherByLocation(this.locale)
    .subscribe(response => {
      this.description = response.weather[0].description;
      GlobalConstants.desc = response.weather[0].description;
      this.temp = 1.8*(response.main.temp-273) + 32;
      this.tempF = (this.temp).toFixed(1);
      this.tempC = ((response.main.temp)-273.15).toFixed(1);
      this.wind = (response.wind.speed).toFixed(1) + " mph";
      this.city = response.name;
      this.lat = response.coord.lat;
      this.lng = response.coord.lon;
    });
    this.changeCoords();
    console.log(this.description);
  }
   changeCoords() {
    this.weatherMapService.setCoord(this.lat, this.lng);
  } 
}