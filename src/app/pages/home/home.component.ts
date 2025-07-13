import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  courses: number[] = [];
  selectedCourse = new FormControl(0);

  constructor (private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    const numCourses = this.activatedRoute.snapshot.data['gpsData'].num_courses;
    this.courses = Array.from({ length: numCourses }, (_, i) => i + 1);
  }
}
