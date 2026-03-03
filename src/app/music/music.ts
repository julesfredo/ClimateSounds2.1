import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from '../GlobalConstants';
import { WeatherMapService } from '../weather-map'
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-music',
  templateUrl: './music.html',
  styleUrl: './music.css'
})
export class Music implements OnInit {

  constructor(private weatherMapService: WeatherMapService, private http: HttpClient) { }

  private data: any;
  entry: Array<any> = [];
  public linksToPlay: Array<any> = [];
  public linkToPlay: any="";

  ngOnInit() {  
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
      console.log(this.data);
      if(this.linksToPlay.length > 0) {
        this.linkToPlay = this.linksToPlay[0];
      }
      
      console.log(this.linkToPlay);
    });
  }
      
    playMusic() {

    }
}