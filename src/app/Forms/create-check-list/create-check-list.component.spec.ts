import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCheckListComponent } from './create-check-list.component';

describe('CreateCheckListComponent', () => {
  let component: CreateCheckListComponent;
  let fixture: ComponentFixture<CreateCheckListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCheckListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCheckListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
