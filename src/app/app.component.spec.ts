import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed, inject, tick, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { WeatherAPIComponent } from './app.component';
import { WeatherAPIService } from './shared/services/weather-api.service';
import { FormsModule } from '@angular/forms';
const json = require('../../mocks/weather.json');
const allyears = require('../../mocks/allyears.json');

describe('WeatherAPIComponent', () => {
  let component: WeatherAPIComponent;
  let fixture: ComponentFixture<WeatherAPIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule, FormsModule, HttpClientModule, HttpClientTestingModule],
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

  describe('Weather API component', () => {
    describe('ngOnInit()', () => {
      beforeEach(() => {
        component.ngOnInit();
      });
    });

    describe('Verify CSV to JSON logic', () => {
      it('Should read JSON file created from CSV and verify the number of json records', fakeAsync(() => {
        component.ngOnInit();
        const oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
        const firstDate = new Date(1858,1,1); //startYear
        const secondDate = new Date(2019,5,28); //endYear/date
        const diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
        // verify json length = number of days between start and end date
        expect(json['WeatherData']['WeatherDataForYear'].length-1).toBe(diffDays);
      }));
    });

    describe('change All Years', () => {
      it('Should change year to all time data and fetch all time data', () => {
        component.model.yearInput = -1;
        component.change();
        const startYear = 1858;
        const endYear = 2019;
        expect(allyears['WeatherData']['WeatherDataForYear'].length).toBe(endYear-startYear+1);
      });
    });

    describe('Weather API mock tests', () => {
      it('[SUCCESS] should fetch years API data', inject(
        [WeatherAPIService, HttpTestingController],
        (weatherAPIService: WeatherAPIService, backend: HttpTestingController) => {
          let apiData = <any>{};
          weatherAPIService.getYears().subscribe(response => (apiData = response), fail);
          backend.expectNone('/weatherAPIHost/public/api/v1/getYears');
        }
      ));

      it('[SUCCESS] should fetch weather API data', inject(
        [WeatherAPIService, HttpTestingController],
        (weatherAPIService: WeatherAPIService, backend: HttpTestingController) => {
          let apiData = <any>{};
          weatherAPIService
            .getWeatherData(
              { year: 2019 },
              {
                model: {
                  weatheerDataOutput: {},
                  yearInput: {}
                }
              }
            )
            .subscribe(response => (apiData = response), fail);
          backend.expectNone('/weatherAPIHost/public/api/v1/getWeatherData');
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
