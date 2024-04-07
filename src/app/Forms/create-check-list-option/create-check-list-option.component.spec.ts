import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCheckListOptionComponent } from './create-check-list-option.component';

describe('CreateCheckListOptionComponent', () => {
  let component: CreateCheckListOptionComponent;
  let fixture: ComponentFixture<CreateCheckListOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCheckListOptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCheckListOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
