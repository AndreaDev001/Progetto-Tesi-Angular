import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBoardPageComponent } from './manage-board-page.component';

describe('ManageBoardPageComponent', () => {
  let component: ManageBoardPageComponent;
  let fixture: ComponentFixture<ManageBoardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageBoardPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageBoardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
