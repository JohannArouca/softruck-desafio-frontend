import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as L from 'leaflet';
import { GpsData } from 'src/app/models/gps.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent {
  private map!: L.Map;
    gpsData!: GpsData;
  
    constructor(private activatedRoute: ActivatedRoute) { }
  
    ngOnInit(): void {
      this.gpsData = this.activatedRoute.snapshot.data['gpsData'];
  
      this.initMap();
    }
  
    private initMap(): void {
      this.map = L.map('map', {
        center: [-23.963214, -46.28054],
        zoom: 13
      });
  
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
    }
}
