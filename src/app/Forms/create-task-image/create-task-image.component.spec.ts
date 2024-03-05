import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTaskImageComponent } from './create-task-image.component';

describe('CreateTaskImageComponent', () => {
  let component: CreateTaskImageComponent;
  let fixture: ComponentFixture<CreateTaskImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTaskImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTaskImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
