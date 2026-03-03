import { TestBed } from '@angular/core/testing';

import { WeatherMap } from './weather-map';

describe('WeatherMap', () => {
  let service: WeatherMap;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherMap);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
