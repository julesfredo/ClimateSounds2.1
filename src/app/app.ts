import { Component, signal } from '@angular/core';
import { Climate } from './climate/climate';
import { Map } from './map/map';
import { Music } from './music/music';

@Component({
  selector: 'app-root',
  imports: [
    Climate,
    Map,
    Music
  ],
  // template: `<app-climate />`,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ClimateSounds2.18.1');
}
