import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoEmpresaComponent } from './tipo-empresa.component';

describe('TipoEmpresaComponent', () => {
  let component: TipoEmpresaComponent;
  let fixture: ComponentFixture<TipoEmpresaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoEmpresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
