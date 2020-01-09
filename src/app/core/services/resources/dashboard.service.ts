import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  dashboardStatus: boolean;
  dashboardTitle: string;

  constructor() {
    this.dashboardStatus = (this.dashboardStatus) ? this.dashboardStatus : false;
   }

   setDashboardStatus(status: boolean, title?:string) {
    this.dashboardStatus = status;
    this.dashboardTitle = (title) ? title : '';
  }
  
}
