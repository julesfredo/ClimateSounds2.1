import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ILocation } from './ILocation';
import { OpenWeather } from './OpenWeather';
import { GlobalConstants } from './GlobalConstants';

@Injectable({
  providedIn: 'root'
})

export class WeatherMapService {
  weatherApiKey: string = '67d4ac0e95120bc42f358dbe5cce49e8';
  openWeatherUrl: string = 'https://api.openweathermap.org/data/2.5/weather?lat=';
  openWeatherUrlLocale: string = 'https://api.openweathermap.org/data/2.5/weather?q=';
  lat: number = 0;
  lng: number = 0;
  private search = new Subject();

  private coord1 = new BehaviorSubject(this.lat) ;
  private coord2 = new BehaviorSubject(this.lng) ;
  currentLat = this.coord1.asObservable();
  currentLng = this.coord2.asObservable();

  private data: any;
  entry: Array<any> = [];
  public linksToPlay: Array<any> = [];
  public linkToPlay: any="https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/5b/49/8c/5b498caf-e3a4-8d48-20ae-0f51cf0a0d6e/mzaf_16238111096439911115.plus.aac.p.m4a";

  constructor(private http: HttpClient) { }
  getLocation(url: string):Observable<ILocation> {
      return this.http.get<ILocation>(url);
    }
    getWeather(lat: number, lng: number):Observable<OpenWeather> {
      return this.http.get<OpenWeather>(this.openWeatherUrl + lat + '&lon=' + lng + 
      '&appid=' + this.weatherApiKey);
    }
    setCoord(lat:number, lng:number) {  
      this.coord1.next(lat);
      this.coord2.next(lng);
    }
    getWeatherByLocation(locale:string){
      return this.http.get<OpenWeather>(this.openWeatherUrlLocale + locale + 
      '&appid=' + this.weatherApiKey);
    }
    
    setMusic() {
    console.log(this.linkToPlay);
    console.log(GlobalConstants.desc);
    switch(GlobalConstants.desc) {
    case 'overcast clouds':
      GlobalConstants.genre = 1010;
      break;
    case 'broken clouds':
      GlobalConstants.genre = 1147;
      break;
    case 'scattered clouds':
      GlobalConstants.genre = 1209;
      break;
    case 'few clouds':
      GlobalConstants.genre = 1112;
      break;
    case 'mist':
      GlobalConstants.genre = 1027;
      break;
    case 'haze':
      GlobalConstants.genre = 1114;
      break;
    case 'drizzle':
      GlobalConstants.genre = 1128;
      break;
    case 'fog':
      GlobalConstants.genre = 1142;
      break;
    case 'clear sky':
      GlobalConstants.genre = 1192;
      break;
    case 'heavy intensity  rain':
      GlobalConstants.genre = 1143;
      break;
    case 'moderate rain':
      GlobalConstants.genre = 1003;
      break;
    case 'light rain':
      GlobalConstants.genre = 1043;
      break;
    case 'heavy snow':
      GlobalConstants.genre = 1082;
      break;
    case 'moderate snow':
      GlobalConstants.genre = 1082;
      break;
    case 'light snow':
      GlobalConstants.genre = 1211;
      break;
    };


    GlobalConstants.iTunesUrl = 'https://itunes.apple.com/us/rss/topsongs/genre=' + GlobalConstants.genre + '/json';
    
    return this.http.get(GlobalConstants.iTunesUrl).subscribe(response => {
      this.data = response;
      this.entry = this.data.feed.entry;
      for(let i=0;i<10;i++) {
        this.linksToPlay.push(this.entry[i].link[1].attributes.href);
      };
      this.linkToPlay = this.linksToPlay[0];
      console.log(this.linkToPlay);
      });
  }
  
  setSong() {
  console.log("Changing song");
        for (var i = 0;i<this.linksToPlay.length; i++) {
      console.log(this.linkToPlay);
      console.log(this.linksToPlay[i]);
          if(this.linkToPlay == this.linksToPlay[i]) {
            this.linkToPlay = this.linksToPlay[i+1];
            this.linksToPlay.splice(i,1);
      console.log(this.linkToPlay);
      }
      break;
    }
    return this.linkToPlay;
  }
    getSearch(): Observable<any> {
      console.log("search recieved service");

      return this.search.asObservable();
    }
}
