import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { gpsResolver } from './gps.resolver';
import { GpsService } from '../services/gps.service';
import { GpsData } from '../models/gps.model';

describe('gpsResolver', () => {
  let resolver: gpsResolver;
  let serviceSpy: jasmine.SpyObj<GpsService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('GpsService', ['getGpsData']);
    TestBed.configureTestingModule({
      providers: [
        gpsResolver,
        { provide: GpsService, useValue: spy },
      ],
    });

    resolver = TestBed.inject(gpsResolver);
    serviceSpy = TestBed.inject(GpsService) as jasmine.SpyObj<GpsService>;
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });

  it('should resolve gps data using GpsService', (done) => {
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

    serviceSpy.getGpsData.and.returnValue(of(mockData));

    resolver.resolve().subscribe(data => {
      expect(data).toEqual(mockData);
      expect(serviceSpy.getGpsData).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
