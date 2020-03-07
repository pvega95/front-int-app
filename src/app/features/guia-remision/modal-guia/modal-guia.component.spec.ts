import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalGuiaComponent } from './modal-guia.component';

describe('ModalGuiaComponent', () => {
  let component: ModalGuiaComponent;
  let fixture: ComponentFixture<ModalGuiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalGuiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalGuiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
