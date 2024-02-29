import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserMultipleComponent } from './add-user-multiple.component';

describe('AddUserMultipleComponent', () => {
  let component: AddUserMultipleComponent;
  let fixture: ComponentFixture<AddUserMultipleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUserMultipleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUserMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
