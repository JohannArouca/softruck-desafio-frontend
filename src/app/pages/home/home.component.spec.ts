import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateService } from '@ngx-translate/core';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'translate' })
class MockTranslatePipe implements PipeTransform {
  transform(value: string): string {
    return value;
  }
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  const translateServiceSpy = jasmine.createSpyObj('TranslateService', ['setDefaultLang', 'use']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent, MockTranslatePipe],
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatSelectModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                gpsData: { num_courses: 3 }
              }
            }
          }
        },
        { provide: TranslateService, useValue: translateServiceSpy }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize courses array based on resolver', () => {
    expect(component.courses).toEqual([1, 2, 3]);
  });

  it('should initialize selectedCourse with 0', () => {
    expect(component.selectedCourse.value).toBe(0);
  });

  it('should change the language on function changeLanguage', () => {
    component.changeLanguage('en');
    expect(translateServiceSpy.use).toHaveBeenCalledWith('en');
  });
});
