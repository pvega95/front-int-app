import { Component, OnInit } from '@angular/core';
import { DashboardService } from '@core/services/resources/dashboard.service';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  menuSubBlock = false;
  constructor(
    public _dashboardService: DashboardService,
    private router : Router,
    private _authService : AuthService
  ) {
    this._dashboardService.setDashboardStatus(true);
   }

  ngOnInit() {
  }

  dropdownShow() {
  
    this.menuSubBlock = !this.menuSubBlock;
  }

  logout(){
    this._authService.logout();
  }

}
