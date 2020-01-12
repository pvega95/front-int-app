import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartaFiscalizacionComponent } from './carta-fiscalizacion.component';

describe('CartaFiscalizacionComponent', () => {
  let component: CartaFiscalizacionComponent;
  let fixture: ComponentFixture<CartaFiscalizacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartaFiscalizacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartaFiscalizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
