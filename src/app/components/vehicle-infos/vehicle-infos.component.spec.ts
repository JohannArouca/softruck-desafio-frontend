import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VehicleInfosComponent } from './vehicle-infos.component';
import { ActivatedRoute } from '@angular/router';
import { Vehicle } from 'src/app/models/gps.model';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('VehicleInfosComponent', () => {
  let component: VehicleInfosComponent;
  let fixture: ComponentFixture<VehicleInfosComponent>;

  const mockVehicle: Vehicle = {
    plate: "BPZ4295",
    vin: "34405892075660",
    color: "#FFEB3B",
    picture:{
      address: "https://s3.amazonaws.com/softruck.fleetview/production/picture/c571fb1e-3906-4ee3-b4c4-7be9ad031d33_Semtitulo.png"
    }
  };

  const activatedRouteStub = {
    snapshot: {
      data: {
        gpsData: {
          vehicle: mockVehicle
        }
      }
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VehicleInfosComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the vehicle data on ngOnInit', () => {
    expect(component.vehicleInfos).toEqual(mockVehicle);
  });

  it('should render the vehicle data on template', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const image: HTMLImageElement = fixture.nativeElement.querySelector('img');
    expect(image.src).toBe(mockVehicle.picture.address);
    expect(image.alt).toBe('Foto do veículo');
    expect(compiled.textContent).toContain('Placa: BPZ4295');
    expect(compiled.textContent).toContain('Chassi: 34405892075660');
  });

  it('should set the color', () => {
    const colorDiv: HTMLElement = fixture.nativeElement.querySelector('#vehicle-color');
    function hexToRgb(hex: string): string {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgb(${r}, ${g}, ${b})`;
    }
    
    expect(colorDiv.style.backgroundColor).toBe(hexToRgb(mockVehicle.color));
  });
});
