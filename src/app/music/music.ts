import { Component, OnInit } from '@angular/core';
import { WeatherMapService } from '../weather-map'
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-music',
  templateUrl: './music.html',
  styleUrl: './music.css'
})
export class Music implements OnInit {

  public songLink: any = "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/5b/49/8c/5b498caf-e3a4-8d48-20ae-0f51cf0a0d6e/mzaf_16238111096439911115.plus.aac.p.m4a";
  constructor(private weatherMapService: WeatherMapService, private http: HttpClient) { }

  ngOnInit() {  
    this.weatherMapService.setMusic();
  }
  onAudioEnded() {
    this.songLink  = this.weatherMapService.setSong();
  }
}