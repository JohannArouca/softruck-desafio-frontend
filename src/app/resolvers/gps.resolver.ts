import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { GpsData } from '../models/gps.model';
import { GpsService } from '../services/gps.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class gpsResolver implements Resolve<GpsData> {
  constructor(private gpsService: GpsService) {}

  resolve(): Observable<GpsData> {
    return this.gpsService.getGpsData();
  }
};
