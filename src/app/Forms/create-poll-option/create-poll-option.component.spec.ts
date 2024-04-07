import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePollOptionComponent } from './create-poll-option.component';

describe('CreatePollOptionComponent', () => {
  let component: CreatePollOptionComponent;
  let fixture: ComponentFixture<CreatePollOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePollOptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePollOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
