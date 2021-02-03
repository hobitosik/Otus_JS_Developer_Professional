import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PraxisComponent } from './praxis.component';

describe('PraxisComponent', () => {
  let component: PraxisComponent;
  let fixture: ComponentFixture<PraxisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PraxisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PraxisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
