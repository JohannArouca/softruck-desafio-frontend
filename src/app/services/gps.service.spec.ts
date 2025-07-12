// src/app/services/data.service.spec.ts

import { TestBed } from '@angular/core/testing';
import { GpsService } from './gps.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { GpsData } from '../models/gps.model';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('GpsService', () => {
  let service: GpsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [GpsService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});

    service = TestBed.inject(GpsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch vehicle data', () => {
    const mockData: GpsData = {
      accOn: '2020-01-21',
      total_time: 12739,
      total_distance: 37035,
      speed_max: 56.486,
      speed_avg: 10.5,
      num_courses: 5,
      stops: 19,
      total_stop_time: 6324,
      perc_fixed: 1,
      gps_count: 230,
      courses: [],
      vehicle: {
        plate: 'BPZ4295',
        vin: '34405892075660',
        color: '#FFEB3B',
        picture: {
          address: 'https://s3.amazonaws.com/softruck.fleetview/production/picture/c571fb1e-3906-4ee3-b4c4-7be9ad031d33_Semtítulo.png'
        }
      }
    };

    service.getGpsData().subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('assets/data/frontend_data_gps.json');
    expect(req.request.method).toBe('GET');

    req.flush(mockData);
  });
});
