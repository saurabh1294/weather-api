import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { WeatherAPIComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { WeatherAPIService } from './shared/services/weather-api.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [WeatherAPIComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{ provide: WeatherAPIService, useClass: WeatherAPIService }],
  bootstrap: [WeatherAPIComponent]
})
export class AppModule {}
