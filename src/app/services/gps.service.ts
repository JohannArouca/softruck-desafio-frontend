import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GpsData } from '../models/gps.model';

@Injectable({
  providedIn: 'root'
})
export class GpsService {
  private jsonUrl = 'assets/data/frontend_data_gps.json';

  constructor(private http: HttpClient) {}

  getGpsData(): Observable<GpsData> {
    return this.http.get<GpsData>(this.jsonUrl);
  }
}
