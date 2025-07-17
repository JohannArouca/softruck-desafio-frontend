import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  courses: number[] = [];
  selectedCourse = new FormControl(0);
  selectedLanguage = 'pt';
  languages = [
    { code: 'pt', flag: 'br' },
    { code: 'en', flag: 'us' },
    { code: 'es', flag: 'es' }
  ];

  constructor (private activatedRoute: ActivatedRoute, private translate: TranslateService) {}

  ngOnInit(): void {
    this.translate.setDefaultLang(this.selectedLanguage);
    const numCourses = this.activatedRoute.snapshot.data['gpsData'].num_courses;
    this.courses = Array.from({ length: numCourses }, (_, i) => i + 1);
  }

  changeLanguage(languague: string) {
    this.translate.use(languague);
    this.selectedLanguage = languague;
  }
}
