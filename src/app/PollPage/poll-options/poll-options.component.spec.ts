import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollOptionsComponent } from './poll-options.component';

describe('PollOptionsComponent', () => {
  let component: PollOptionsComponent;
  let fixture: ComponentFixture<PollOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PollOptionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PollOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
