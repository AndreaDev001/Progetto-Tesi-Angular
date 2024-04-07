import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskInviteCardComponent } from './board-invite-card.component';

describe('TaskInviteCardComponent', () => {
  let component: TaskInviteCardComponent;
  let fixture: ComponentFixture<TaskInviteCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskInviteCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskInviteCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
