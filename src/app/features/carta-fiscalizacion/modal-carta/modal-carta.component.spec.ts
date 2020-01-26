import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCartaComponent } from './modal-carta.component';

describe('ModalCartaComponent', () => {
  let component: ModalCartaComponent;
  let fixture: ComponentFixture<ModalCartaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCartaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCartaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
