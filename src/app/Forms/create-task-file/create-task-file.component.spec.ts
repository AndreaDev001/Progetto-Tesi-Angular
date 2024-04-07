import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTaskFileComponent } from './create-task-file.component';

describe('CreateTaskFileComponent', () => {
  let component: CreateTaskFileComponent;
  let fixture: ComponentFixture<CreateTaskFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTaskFileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTaskFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
