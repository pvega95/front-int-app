import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelThreeComponent } from './model-three.component';

describe('ModelThreeComponent', () => {
  let component: ModelThreeComponent;
  let fixture: ComponentFixture<ModelThreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelThreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
