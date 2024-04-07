import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskURLComponent } from './task-url.component';

describe('TaskURLComponent', () => {
  let component: TaskURLComponent;
  let fixture: ComponentFixture<TaskURLComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskURLComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskURLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
