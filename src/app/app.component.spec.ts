import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { WeatherAPIComponent } from './app.component';
import { WeatherAPIService } from './shared/services/weather-api.service';
import { FormsModule } from '@angular/forms';

describe('WeatherAPIComponent', () => {
  let component: WeatherAPIComponent;
  let fixture: ComponentFixture<WeatherAPIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        HttpClientTestingModule
      ],
      declarations: [WeatherAPIComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherAPIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
  });

  describe('Book selector component', () => {
    describe('ngOnInit()', () => {
      beforeEach(() => {
        component.ngOnInit();
      });
    });

    describe('getYears()', () => {
      it('[SUCCESS] should fetch years API data', inject(
        [WeatherAPIService, HttpTestingController],
        (weatherAPIService: WeatherAPIService, backend: HttpTestingController) => {
          let apiData = <any>{};
          weatherAPIService.getYears().subscribe(response => (apiData = response), fail);
          const req = backend.expectNone('/weatherAPIHost/public/api/v1/getYears');
        }
      ));

      it('[SUCCESS] should fetch weather API data', inject(
        [WeatherAPIService, HttpTestingController],
        (weatherAPIService: WeatherAPIService, backend: HttpTestingController) => {
          let apiData = <any>{};
          weatherAPIService.getWeatherData({year: 2019}, {model : {
            weatheerDataOutput : {},
            yearInput: {}
          }}).subscribe(response => (apiData = response), fail);
          const req = backend.expectNone('/weatherAPIHost/public/api/v1/getWeatherData');
        }
      ));
    });
  });

  // view test cases
  describe('view', () => {
    it('should expect form to be present', () => {
      const form: DebugElement = fixture.debugElement.query(By.css('form'));
      expect(form.nativeElement).toBeDefined();
    });

    it('should expect yearInput to be present', () => {
        const yearInput: DebugElement = fixture.debugElement.query(By.css('#yearInput'));
        expect(yearInput.nativeElement).toBeDefined();
    });

    it('should expect weather data output field to be present', () => {
        const weatherDataOutput: DebugElement = fixture.debugElement.query(By.css('#weatherDataOutput'));
        expect(weatherDataOutput.nativeElement).toBeDefined();
    });

    it('should expect jsonEditor to be present', () => {
        const jsonEditor: DebugElement = fixture.debugElement.query(By.css('#jsoneditor'));
        expect(jsonEditor.nativeElement).toBeDefined();
    });

  });
});