import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { HomeComponent } from './home/home.component';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  {path:"",component:IndexComponent},
  {path:"home",component:HomeComponent},
  {path:"adminHome",component:AdminHomeComponent},
  {path:"customerHome",component:CustomerHomeComponent},
  {path:"index",component:IndexComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
