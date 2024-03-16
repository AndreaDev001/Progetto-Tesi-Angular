import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTaskURLComponent } from './create-task-url.component';

describe('CreateTaskURLComponent', () => {
  let component: CreateTaskURLComponent;
  let fixture: ComponentFixture<CreateTaskURLComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTaskURLComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTaskURLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
