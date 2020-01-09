import { Component, OnInit } from '@angular/core';
import { DashboardService } from '@core/services/resources/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  menuSubBlock = false;
  constructor(
    public _dashboardService: DashboardService,
  ) {
    this._dashboardService.setDashboardStatus(true);
   }

  ngOnInit() {
  }

  dropdownShow() {
    console.log(this.menuSubBlock);
    this.menuSubBlock = !this.menuSubBlock;
  }

}
