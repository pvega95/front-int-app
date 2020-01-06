import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/****** Shared Module ******/
import { SharedModule } from '@shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule,
    
  ]
})
export class DashboardModule { }
