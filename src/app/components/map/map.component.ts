import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as L from 'leaflet';
import { GpsData, GpsPoint } from 'src/app/models/gps.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit, OnChanges, OnDestroy {
  @Input() selectedCourseIndex!: number;

  private map!: L.Map;
  private currentPolyline: L.Polyline | null = null;
  private carMarker!: L.Marker;

  private gpsData!: GpsData;

  private animationCurrentPointIndex = 0;
  private requestAnimationFrameId: number | null = null;
  private startTimeAnimationPoint = 0;

  private animationFromPoint!: GpsPoint;
  private animationToPoint!: GpsPoint;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.gpsData = this.activatedRoute.snapshot.data['gpsData'];
    this.initMap();
  }

  ngOnChanges(): void {
    if (this.selectedCourseIndex > 0) {
      this.initCourse();
    }
  }

  ngOnDestroy(): void {
    if (this.requestAnimationFrameId) cancelAnimationFrame(this.requestAnimationFrameId);
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [-23.963214, -46.28054],
      zoom: 13
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
  }

  private initCourse(): void {
    if (this.currentPolyline) this.map.removeLayer(this.currentPolyline);
    if (this.carMarker) this.map.removeLayer(this.carMarker);
    if (this.requestAnimationFrameId) cancelAnimationFrame(this.requestAnimationFrameId);
  
    const course = this.gpsData.courses[this.selectedCourseIndex - 1];
    const latlngs = course.gps.map((p: GpsPoint) => [p.latitude, p.longitude]);
    this.currentPolyline = L.polyline(latlngs as L.LatLngExpression[], { color: 'blue' }).addTo(this.map);
    this.map.fitBounds(this.currentPolyline.getBounds());
  
    const carIcon = L.divIcon({
      html: `<div class="car-sprite"></div>`,
      className: '',
      iconSize: [30, 30],
      iconAnchor: [15, 15]
    });
  
    this.carMarker = L.marker(latlngs[0] as L.LatLngTuple, { icon: carIcon }).addTo(this.map);
  
    this.animationCurrentPointIndex = 0;
    this.animateStep(course.gps);
  }
  
  private animateStep(gpsPoints: GpsPoint[]): void {
    if (this.animationCurrentPointIndex >= gpsPoints.length - 1) return;

    this.animationFromPoint = gpsPoints[this.animationCurrentPointIndex];
    this.animationToPoint = gpsPoints[this.animationCurrentPointIndex + 1];

    this.startTimeAnimationPoint = performance.now();
    this.step(gpsPoints);
  }

  private step(gpsPoints: GpsPoint[]): void {
    const now = performance.now();
    const pastTime = now - this.startTimeAnimationPoint;
    const animationTimeUnix = this.animationToPoint.acquisition_time_unix - this.animationFromPoint.acquisition_time_unix;
    const progress = pastTime / (animationTimeUnix * 50);
  
    const latitude = this.animationFromPoint.latitude + progress * (this.animationToPoint.latitude - this.animationFromPoint.latitude);
    const longitude = this.animationFromPoint.longitude + progress * (this.animationToPoint.longitude - this.animationFromPoint.longitude);
  
    this.carMarker.setLatLng([latitude, longitude]);
  
    const iconElement = this.carMarker.getElement() as HTMLElement;
    const innerDiv = iconElement?.querySelector('div') as HTMLElement;
  
    if (innerDiv) {
      const carFrameWidth = 30;
      const spriteTotalCarFrames = 120;
      const gpsDirection = this.animationToPoint.direction;
      const spriteAngle = (360 - gpsDirection) % 360;
      const carFrameIndex = Math.round(spriteAngle / (360 / spriteTotalCarFrames)) % spriteTotalCarFrames;

      const offsetX = -(carFrameIndex * carFrameWidth);

      innerDiv.style.backgroundPosition = `${offsetX}px 0`;
    }
  
    this.map.panTo([latitude, longitude], { animate: true });
  
    if (progress < 1) {
      this.requestAnimationFrameId = requestAnimationFrame(() => this.step(gpsPoints));
    } else {
      this.animationCurrentPointIndex++;
      this.animateStep(gpsPoints);
    }
  }
  
}
