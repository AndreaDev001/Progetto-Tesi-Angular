import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskElementComponent } from './task-element.component';

describe('TaskElementComponent', () => {
  let component: TaskElementComponent;
  let fixture: ComponentFixture<TaskElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskElementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
