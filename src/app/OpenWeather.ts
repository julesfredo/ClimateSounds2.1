import { Observable } from "rxjs"

export interface OpenWeather {
    base: string,
    clouds: {
        all: string
    },
    cod: number
    coord: {
        lon: number,
        lat: number
    }
    dt: number
    id: number
    main: {
        feels_like: number,
        humidity: number,
        temp: number,
        temp_min: number,
        temp_max: number,
        pressure: number,
    }
    name: string,
    sys: {
        type: number,
        id: number,
        country: string,
        sunrise: number,
        sunset: number
    }
    timezone: number
    visibility: number
    weather: [{
        description: string,
        icon: string,
        id: number,
        main:  string
    }]
    wind: {
        speed: number,
        deg: number
    }
}

export interface Music {
    
}