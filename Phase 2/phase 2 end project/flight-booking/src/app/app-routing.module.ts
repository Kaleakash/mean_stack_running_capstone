import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { FlightSearchedResultComponent } from './flight-searched-result/flight-searched-result.component';

const routes: Routes = [
  {path:"",component:FlightSearchComponent},
  {path:"flight-searched-result",component:FlightSearchedResultComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
