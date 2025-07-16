import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Vehicle } from 'src/app/models/gps.model';

@Component({
  selector: 'app-vehicle-infos',
  templateUrl: './vehicle-infos.component.html',
  styleUrl: './vehicle-infos.component.scss'
})
export class VehicleInfosComponent implements OnInit {
  vehicleInfos!: Vehicle; 
  
  constructor(private activatedRoute: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.vehicleInfos = this.activatedRoute.snapshot.data['gpsData'].vehicle;
  }
}
