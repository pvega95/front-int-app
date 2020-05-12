import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaDonaComponent } from './grafica-dona.component';

describe('GraficaDonaComponent', () => {
  let component: GraficaDonaComponent;
  let fixture: ComponentFixture<GraficaDonaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficaDonaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficaDonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
