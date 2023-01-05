import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Flight } from './flight';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  constructor(public http:HttpClient) { }
  

  loadFlightDetails():Observable<Flight[]> {
    return this.http.get<Flight[]>("../assets/flights.json");
  }
}
