import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentlyWordsComponent } from './recently-words.component';

describe('RecentlyWordsComponent', () => {
  let component: RecentlyWordsComponent;
  let fixture: ComponentFixture<RecentlyWordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentlyWordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentlyWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
