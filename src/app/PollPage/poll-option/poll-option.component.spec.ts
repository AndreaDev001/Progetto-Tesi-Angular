import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollOptionComponent } from './poll-option.component';

describe('PollOptionComponent', () => {
  let component: PollOptionComponent;
  let fixture: ComponentFixture<PollOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PollOptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PollOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
