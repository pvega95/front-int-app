import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HojaEnvioComponent } from './hoja-envio.component';

describe('HojaEnvioComponent', () => {
  let component: HojaEnvioComponent;
  let fixture: ComponentFixture<HojaEnvioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HojaEnvioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HojaEnvioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
