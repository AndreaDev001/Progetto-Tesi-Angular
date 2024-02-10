import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollsPageComponent } from './polls-page.component';

describe('PollsPageComponent', () => {
  let component: PollsPageComponent;
  let fixture: ComponentFixture<PollsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PollsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PollsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
