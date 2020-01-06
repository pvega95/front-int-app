import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingfullComponent } from './loadingfull.component';

describe('LoadingfullComponent', () => {
  let component: LoadingfullComponent;
  let fixture: ComponentFixture<LoadingfullComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingfullComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingfullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
