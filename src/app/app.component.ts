import { Component, OnInit } from '@angular/core';
import { WeatherAPIService } from './shared/services/weather-api.service';
import JSONEditor from 'jsoneditor/dist/jsoneditor.min.js';
import { NgxSpinnerService } from 'ngx-spinner';

/** @title Weather API component */
@Component({
  selector: 'app-root app-weather-api-demo',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class WeatherAPIComponent implements OnInit {
  model: any = {};
  startYear: number;
  endYear: number;
  years: Array<number> = [];
  editor: any;

  constructor(private weatherAPIService: WeatherAPIService, private spinner: NgxSpinnerService) {}

  ngOnInit() {
    this.model.yearInput = '1';
    // create the editor
    const container = document.getElementById('jsoneditor');
    this.editor = new JSONEditor(container);
    // set some sample json in the jsoneditor initially
    const json = {
      Array: [1, 2, 3],
      Boolean: true,
      Null: null,
      Number: 123,
      Object: { a: 'b', c: 'd' },
      String: 'Sample JSON'
    };
    this.editor.set(json);

    this.weatherAPIService.getYears().subscribe(response => {
      this.startYear = parseInt(response.startYear, 10);
      this.endYear = parseInt(response.endYear, 10);
      this.spinner.show(); // show spinner
      for (let i = this.startYear; i <= this.endYear; i++) {
        this.years.push(i);
      }
      // hide spinner
      setTimeout(() => {
        this.spinner.hide();
      }, 2000);
    });
  }

  change() {
    const param = this.model.yearInput < 0 ? 0 : this.years[this.model.yearInput];
    this.spinner.show(); // show spinner
    this.weatherAPIService.getWeatherData(param, this.model).subscribe(response => {
      console.log(response, 'this is the response');
      this.spinner.hide(); // hide spinner
      this.model.weatherDataOutput = JSON.stringify(response, null, 4);
      this.editor.set(response);
    });
  }
}
