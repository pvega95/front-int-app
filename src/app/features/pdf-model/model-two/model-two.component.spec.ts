import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelTwoComponent } from './model-two.component';

describe('ModelTwoComponent', () => {
  let component: ModelTwoComponent;
  let fixture: ComponentFixture<ModelTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
