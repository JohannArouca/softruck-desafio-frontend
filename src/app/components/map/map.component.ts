import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as L from 'leaflet';
import { GpsData } from 'src/app/models/gps.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit, OnChanges {
  @Input() selectedCourse!: number;
  private map!: L.Map;
  private currentPolyline: L.Polyline | null = null;
  gpsData!: GpsData;
  
  constructor(private activatedRoute: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.gpsData = this.activatedRoute.snapshot.data['gpsData'];
    
    this.initMap();
  }
  
  ngOnChanges(): void {
    if(this.selectedCourse > 0) this.initCourse();
  }
  
  private initMap(): void {
    this.map = L.map('map', {
      center: [-23.963214, -46.28054],
      zoom: 13
    });
  
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
  }

  private initCourse() {
    if (this.currentPolyline) this.map.removeLayer(this.currentPolyline);

    const course = this.gpsData.courses[this.selectedCourse - 1];
    const latlngs = course.gps.map((point: any) => [point.latitude, point.longitude]);

    this.currentPolyline = L.polyline(latlngs, { color: 'blue', weight: 4 }).addTo(this.map);
    this.map.fitBounds(this.currentPolyline.getBounds());
  }
}
