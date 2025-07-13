import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { gpsResolver } from './resolvers/gps.resolver';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: { gpsData: gpsResolver }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
