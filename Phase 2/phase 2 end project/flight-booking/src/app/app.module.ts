import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { AirportComponent } from './airport/airport.component';
import { AirlinesComponent } from './airlines/airlines.component';
import { FlightSearchedResultComponent } from './flight-searched-result/flight-searched-result.component';
import {ReactiveFormsModule} from '@angular/forms'

@NgModule({
  declarations: [
    AppComponent,
    FlightSearchComponent,
    AirportComponent,
    AirlinesComponent,
    FlightSearchedResultComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
