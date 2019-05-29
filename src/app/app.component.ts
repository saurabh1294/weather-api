import { Component, OnInit } from '@angular/core';
import { WeatherAPIService } from './shared/services/weather-api.service';

/** @title Datepicker emulating a Year and month picker */
@Component({
  selector: 'app-root app-weather-api-demo',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class WeatherAPIComponent implements OnInit {
  model: any = {};

  constructor(private weatherAPIService: WeatherAPIService) {}

  ngOnInit() {
    // TODO any initialization goes here
    this.model.yearInput = '1';
  }

  change() {
    console.log(this.model.yearInput);
  }

  submit() {
    /*this.weatherAPIService.sendMails(this.model.yearInput, this.model).subscribe(response => {
      console.log(response, 'this is the response');
      this.model.weatherDataOutput = JSON.stringify(response);
    });*/
    console.log(this.model.yearInput);
  }
}
