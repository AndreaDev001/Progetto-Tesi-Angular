import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiSelectionComponent } from './multi-selection.component';

describe('MultiSelectionComponent', () => {
  let component: MultiSelectionComponent;
  let fixture: ComponentFixture<MultiSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiSelectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
