import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapComponent } from './map.component';
import { ActivatedRoute } from '@angular/router';
import * as L from 'leaflet';
import { GpsData } from 'src/app/models/gps.model';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  const mockGpsData: GpsData = {
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
    courses: [
      {
        start_at: '2020-01-21T14:25:38Z',
        end_at: '2020-01-21T15:23:24Z',
        distance: 9326,
        speed_max: 48.152,
        stops: 2,
        total_stop_time: 2401,
        stop_points: {
          type: 'MultiPoint',
          crs: {
            type: 'name',
            properties: {
              name: 'EPSG:4326',
            },
          },
          coordinates: [
            [-46.28054, -23.963214, 1579616738, null, null],
            [-46.278857, -23.91349, 1579618283, null, null],
          ],
        },
        gps_count: 43,
        duration: 3466,
        speed_avg: 9.7,
        gps: [
          {
            longitude: -46.28054,
            latitude: -23.963214,
            acquisition_time_unix: 1579616738,
            speed: 0,
            direction: 0,
            acquisition_time: '2020-01-21T14:25:38Z',
            address:
              'Rua Alvaro Leão Carmelo, Jardim Boa Esperança, Vicente de Carvalho, Guarujá, SP, 11460-006, Brasil',
          },
          {
            longitude: -46.280544,
            latitude: -23.96325,
            acquisition_time_unix: 1579616858,
            speed: 0,
            direction: 0,
            acquisition_time: '2020-01-21T14:27:38Z',
          },
          {
            longitude: -46.280536,
            latitude: -23.96319,
            acquisition_time_unix: 1579616978,
            speed: 0,
            direction: 0,
            acquisition_time: '2020-01-21T14:29:38Z',
          },
          {
            longitude: -46.280566,
            latitude: -23.963218,
            acquisition_time_unix: 1579617098,
            speed: 0,
            direction: 0,
            acquisition_time: '2020-01-21T14:31:38Z',
          },
          {
            longitude: -46.278824,
            latitude: -23.962782,
            acquisition_time_unix: 1579617218,
            speed: 14.816,
            direction: 71.8,
            acquisition_time: '2020-01-21T14:33:38Z',
          },
          {
            longitude: -46.276578,
            latitude: -23.962299,
            acquisition_time_unix: 1579617288,
            speed: 13.3344,
            direction: 155.8,
            acquisition_time: '2020-01-21T14:34:48Z',
          },
          {
            longitude: -46.276151,
            latitude: -23.962701,
            acquisition_time_unix: 1579617343,
            speed: 14.4456,
            direction: 66.8,
            acquisition_time: '2020-01-21T14:35:43Z',
          },
          {
            longitude: -46.273192,
            latitude: -23.96197,
            acquisition_time_unix: 1579617407,
            speed: 18.3348,
            direction: 116.9,
            acquisition_time: '2020-01-21T14:36:47Z',
          },
          {
            longitude: -46.273007,
            latitude: -23.962278,
            acquisition_time_unix: 1579617413,
            speed: 27.2244,
            direction: 162.9,
            acquisition_time: '2020-01-21T14:36:53Z',
          },
          {
            longitude: -46.271715,
            latitude: -23.967683,
            acquisition_time_unix: 1579617469,
            speed: 44.6332,
            direction: 208.1,
            acquisition_time: '2020-01-21T14:37:49Z',
          },
          {
            longitude: -46.272499,
            latitude: -23.96945,
            acquisition_time_unix: 1579617488,
            speed: 40.9292,
            direction: 156.7,
            acquisition_time: '2020-01-21T14:38:08Z',
          },
          {
            longitude: -46.272075,
            latitude: -23.969783,
            acquisition_time_unix: 1579617493,
            speed: 43.3368,
            direction: 106.7,
            acquisition_time: '2020-01-21T14:38:13Z',
          },
          {
            longitude: -46.26827,
            latitude: -23.969396,
            acquisition_time_unix: 1579617531,
            speed: 42.596000000000004,
            direction: 156.3,
            acquisition_time: '2020-01-21T14:38:51Z',
          },
          {
            longitude: -46.26833,
            latitude: -23.969987,
            acquisition_time_unix: 1579617537,
            speed: 40.00320000000001,
            direction: 210.1,
            acquisition_time: '2020-01-21T14:38:57Z',
          },
          {
            longitude: -46.268985,
            latitude: -23.970339,
            acquisition_time_unix: 1579617544,
            speed: 42.9664,
            direction: 261.6,
            acquisition_time: '2020-01-21T14:39:04Z',
          },
          {
            longitude: -46.269761,
            latitude: -23.970108,
            acquisition_time_unix: 1579617551,
            speed: 44.818400000000004,
            direction: 310.6,
            acquisition_time: '2020-01-21T14:39:11Z',
          },
          {
            longitude: -46.275067,
            latitude: -23.956029,
            acquisition_time_unix: 1579617671,
            speed: 48.152,
            direction: 341.7,
            acquisition_time: '2020-01-21T14:41:11Z',
          },
          {
            longitude: -46.279812,
            latitude: -23.942894,
            acquisition_time_unix: 1579617791,
            speed: 42.4108,
            direction: 341.3,
            acquisition_time: '2020-01-21T14:43:11Z',
          },
          {
            longitude: -46.284281,
            latitude: -23.9299,
            acquisition_time_unix: 1579617911,
            speed: 47.226,
            direction: 343.3,
            acquisition_time: '2020-01-21T14:45:11Z',
          },
          {
            longitude: -46.288398,
            latitude: -23.916852,
            acquisition_time_unix: 1579618031,
            speed: 43.1516,
            direction: 349.9,
            acquisition_time: '2020-01-21T14:47:11Z',
          },
          {
            longitude: -46.288417,
            latitude: -23.91664,
            acquisition_time_unix: 1579618033,
            speed: 41.67,
            direction: 359.1,
            acquisition_time: '2020-01-21T14:47:13Z',
          },
          {
            longitude: -46.287455,
            latitude: -23.914834,
            acquisition_time_unix: 1579618054,
            speed: 37.595600000000005,
            direction: 46.3,
            acquisition_time: '2020-01-21T14:47:34Z',
          },
          {
            longitude: -46.28177,
            latitude: -23.913184,
            acquisition_time_unix: 1579618119,
            speed: 16.4828,
            direction: 94.7,
            acquisition_time: '2020-01-21T14:48:39Z',
          },
          {
            longitude: -46.281638,
            latitude: -23.91327,
            acquisition_time_unix: 1579618123,
            speed: 14.6308,
            direction: 143.7,
            acquisition_time: '2020-01-21T14:48:43Z',
          },
          {
            longitude: -46.281013,
            latitude: -23.914424,
            acquisition_time_unix: 1579618157,
            speed: 9.4452,
            direction: 81.9,
            acquisition_time: '2020-01-21T14:49:17Z',
          },
          {
            longitude: -46.280867,
            latitude: -23.91432,
            acquisition_time_unix: 1579618163,
            speed: 12.2232,
            direction: 34.3,
            acquisition_time: '2020-01-21T14:49:23Z',
          },
          {
            longitude: -46.278857,
            latitude: -23.91349,
            acquisition_time_unix: 1579618283,
            speed: 0,
            direction: 0,
            acquisition_time: '2020-01-21T14:51:23Z',
          },
          {
            longitude: -46.278849,
            latitude: -23.9135,
            acquisition_time_unix: 1579618403,
            speed: 0,
            direction: 0,
            acquisition_time: '2020-01-21T14:53:23Z',
          },
          {
            longitude: -46.278848,
            latitude: -23.913497,
            acquisition_time_unix: 1579618523,
            speed: 0,
            direction: 0,
            acquisition_time: '2020-01-21T14:55:23Z',
          },
          {
            longitude: -46.278836,
            latitude: -23.913488,
            acquisition_time_unix: 1579618643,
            speed: 0,
            direction: 0,
            acquisition_time: '2020-01-21T14:57:23Z',
          },
          {
            longitude: -46.278843,
            latitude: -23.913478,
            acquisition_time_unix: 1579618764,
            speed: 0,
            direction: 0,
            acquisition_time: '2020-01-21T14:59:24Z',
          },
          {
            longitude: -46.278582,
            latitude: -23.913452,
            acquisition_time_unix: 1579618884,
            speed: 0,
            direction: 0,
            acquisition_time: '2020-01-21T15:01:24Z',
          },
          {
            longitude: -46.278654,
            latitude: -23.913488,
            acquisition_time_unix: 1579619004,
            speed: 0,
            direction: 0,
            acquisition_time: '2020-01-21T15:03:24Z',
          },
          {
            longitude: -46.278691,
            latitude: -23.913492,
            acquisition_time_unix: 1579619124,
            speed: 0,
            direction: 0,
            acquisition_time: '2020-01-21T15:05:24Z',
          },
          {
            longitude: -46.278697,
            latitude: -23.913491,
            acquisition_time_unix: 1579619244,
            speed: 0,
            direction: 0,
            acquisition_time: '2020-01-21T15:07:24Z',
          },
          {
            longitude: -46.27867,
            latitude: -23.913502,
            acquisition_time_unix: 1579619364,
            speed: 0,
            direction: 0,
            acquisition_time: '2020-01-21T15:09:24Z',
          },
          {
            longitude: -46.278706,
            latitude: -23.913457,
            acquisition_time_unix: 1579619484,
            speed: 0,
            direction: 0,
            acquisition_time: '2020-01-21T15:11:24Z',
          },
          {
            longitude: -46.278714,
            latitude: -23.913509,
            acquisition_time_unix: 1579619604,
            speed: 0,
            direction: 0,
            acquisition_time: '2020-01-21T15:13:24Z',
          },
          {
            longitude: -46.278682,
            latitude: -23.913505,
            acquisition_time_unix: 1579619724,
            speed: 0,
            direction: 0,
            acquisition_time: '2020-01-21T15:15:24Z',
          },
          {
            longitude: -46.278645,
            latitude: -23.913515,
            acquisition_time_unix: 1579619844,
            speed: 0,
            direction: 0,
            acquisition_time: '2020-01-21T15:17:24Z',
          },
          {
            longitude: -46.278662,
            latitude: -23.913506,
            acquisition_time_unix: 1579619964,
            speed: 0,
            direction: 0,
            acquisition_time: '2020-01-21T15:19:24Z',
          },
          {
            longitude: -46.278711,
            latitude: -23.913525,
            acquisition_time_unix: 1579620084,
            speed: 0,
            direction: 0,
            acquisition_time: '2020-01-21T15:21:24Z',
          },
          {
            longitude: -46.278736,
            latitude: -23.913536,
            acquisition_time_unix: 1579620204,
            speed: 0,
            direction: 0,
            acquisition_time: '2020-01-21T15:23:24Z',
            address:
              'Rodovia Manoel Hipólito do Rego, Monte Cabrão, Santos, Santos, SP, 11450170, Brasil',
          },
        ],
      },
    ],
    vehicle: {
      plate: 'BPZ4295',
      vin: '34405892075660',
      color: '#FFEB3B',
      picture: {
        address:
          'https://s3.amazonaws.com/softruck.fleetview/production/picture/c571fb1e-3906-4ee3-b4c4-7be9ad031d33_Semtítulo.png',
      },
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MapComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: { gpsData: mockGpsData },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;

    const mapContainer = document.createElement('div');
    mapContainer.id = 'map';
    document.body.appendChild(mapContainer);
  });

  afterEach(() => {
    document.getElementById('map')?.remove();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the map on ngOnInit', () => {
    spyOn(L, 'map').and.callThrough();
    component.ngOnInit();
    expect(L.map).toHaveBeenCalled();
  });

  it('should set gpsData from ActivatedRoute', () => {
    component.ngOnInit();
    expect(component['gpsData']).toEqual(mockGpsData);
  });

  it('should init course and create polyline & marker when selectedCourseIndex > 0', () => {
    component.ngOnInit();

    const mapSpy = spyOn(component as any, 'initCourse').and.callThrough();
    component.selectedCourseIndex = 1;

    component.ngOnChanges();

    expect(mapSpy).toHaveBeenCalled();
    expect((component as any).currentPolyline).toBeTruthy();
    expect((component as any).carMarker).toBeTruthy();
  });

  it('should run animateStep and step without error', () => {
    component.ngOnInit();
    component.selectedCourseIndex = 1;

    component.ngOnChanges();

    const gpsPoints = mockGpsData.courses[0].gps;

    component['animateStep'](gpsPoints);
    component['step'](gpsPoints);

    expect(component['animationFromPoint']).toEqual(gpsPoints[0]);
    expect(component['animationToPoint']).toEqual(gpsPoints[1]);
  });

  it('should cancel animation frame on destroy', () => {
    component['requestAnimationFrameId'] = 123;
    spyOn(window, 'cancelAnimationFrame');
    component.ngOnDestroy();
    expect(cancelAnimationFrame).toHaveBeenCalledWith(123);
  });
});
