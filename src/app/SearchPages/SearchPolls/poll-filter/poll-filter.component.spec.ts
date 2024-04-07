import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollFilterComponent } from './poll-filter.component';

describe('PollFilterComponent', () => {
  let component: PollFilterComponent;
  let fixture: ComponentFixture<PollFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PollFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PollFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
