import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollPageComponent } from './poll-page.component';

describe('PollPageComponent', () => {
  let component: PollPageComponent;
  let fixture: ComponentFixture<PollPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PollPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PollPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
