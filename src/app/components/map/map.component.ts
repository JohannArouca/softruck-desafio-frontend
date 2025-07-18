import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as L from 'leaflet';
import { Course, GpsData, GpsPoint } from 'src/app/models/gps.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit, OnChanges, OnDestroy {
  @Input() selectedCourseIndex!: number;

  private course!: Course;

  private map!: L.Map;
  private currentPolyline: L.Polyline | null = null;
  private carMarker!: L.Marker;

  private gpsData!: GpsData;

  private animationCurrentPointIndex = 0;
  private requestAnimationFrameId: number | null = null;
  private startTimeAnimationPoint = 0;

  private animationFromPoint!: GpsPoint;
  private animationToPoint!: GpsPoint;

  public showVehicleInfos = false;

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
  
    this.course = this.gpsData.courses[this.selectedCourseIndex - 1];
    const latlngs = this.course.gps.map((p: GpsPoint) => [p.latitude, p.longitude]);
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
    this.moveCarToNextPoint();
  }

  private moveCarToNextPoint() {
    const gpsPoints = this.course.gps;
    const stopPoints = this.course.gps.map((p: GpsPoint) => [p.latitude, p.longitude]);
    
    if (this.animationCurrentPointIndex >= gpsPoints.length - 1) return;

    if (!this.startTimeAnimationPoint) this.startTimeAnimationPoint = performance.now();

    this.animationFromPoint = gpsPoints[this.animationCurrentPointIndex];
    this.animationToPoint = gpsPoints[this.animationCurrentPointIndex + 1];

    const now = performance.now();
    const pastTime = now - this.startTimeAnimationPoint;
    const distance = this.haversineDistance(this.animationFromPoint, this.animationToPoint);
    const avgSpeed = ((this.animationFromPoint.speed || 0) + (this.animationToPoint.speed || 0)) / 2 || 1;
    const duration = Math.max((distance / avgSpeed) * 1000, 300);
    const progress = Math.min(pastTime / duration, 1);

    const latitude = this.animationFromPoint.latitude + progress * (this.animationToPoint.latitude - this.animationFromPoint.latitude);
    const longitude = this.animationFromPoint.longitude + progress * (this.animationToPoint.longitude - this.animationFromPoint.longitude);
  
    this.carMarker.setLatLng([latitude, longitude]);

    this.directCar();

    this.map.panTo([latitude, longitude], { animate: true });
  
    if (progress < 1) {
      this.requestAnimationFrameId = requestAnimationFrame(() => this.moveCarToNextPoint());
    } else {
      this.animationCurrentPointIndex++;
      this.startTimeAnimationPoint = 0;
      this.moveCarToNextPoint();
    }
  }

  private haversineDistance(p1: GpsPoint, p2: GpsPoint): number {
    const R = 6371000; // raio da Terra em metros
    const toRad = (deg: number) => deg * Math.PI / 180;
  
    const dLat = toRad(p2.latitude - p1.latitude);
    const dLon = toRad(p2.longitude - p1.longitude);
  
    const lat1 = toRad(p1.latitude);
    const lat2 = toRad(p2.latitude);
  
    const a = Math.sin(dLat/2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon/2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    return R * c;
  }

  private directCar(): void {
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
  }
}
