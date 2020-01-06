import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loadingfull',
  templateUrl: './loadingfull.component.html',
  styleUrls: ['./loadingfull.component.scss']
})
export class LoadingfullComponent implements OnInit {
  
  @Input('active') active: any = false;

  constructor() { }

  ngOnInit() {
  }

}
